package org.java.pinwisebackend.controllers;


import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.java.pinwisebackend.DTOs.*;
import org.java.pinwisebackend.configurations.TokenProvider;
import org.java.pinwisebackend.entities.PasswdResetToken;
import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.entities.Utility;
import org.java.pinwisebackend.services.AuthService;
import org.java.pinwisebackend.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Objects;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService service;
    @Autowired
    private MailService mailService;
    @Autowired
    private TokenProvider tokenService;
    @Autowired
    ApplicationEventPublisher eventPublisher;

    private JavaMailSender mailSender;

    @PostMapping("/register")
    public ResponseEntity<?> signUp(@RequestBody SignUpDto data, HttpServletRequest request) {
        try {
            UserDetails registered = service.signUp(data);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<JwtDto> signIn(@RequestBody  SignInDto data) {
        var emailPassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authUser = authenticationManager.authenticate(emailPassword);
        var accessToken = tokenService.generateAccessToken((User) authUser.getPrincipal());

        return ResponseEntity.ok(new JwtDto(accessToken));
    }

    // TODO: KOD DO SPRAWDZANIA 

    // @PostMapping("/verify")
    // public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
    //     try {
    //         String userId = tokenService.validateToken(token);
    //         if (userId != null) {
    //             return ResponseEntity.ok(userId);
    //         } else {
    //             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    //         }
    //     } catch (JWTVerificationException e) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    //     }
    // }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(HttpServletRequest request, @RequestBody EmailDto data) {
        String email = data.email();


        try {

            User found = service.loadUserByUsername(email);
            if(found == null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No account associated with this e-mail found.");

            PasswdResetToken rsttoken = service.getByUser(found);

            if(rsttoken != null) {
                if (rsttoken.isTokenCooldown())
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("You must wait for 1 minute before attempting to reset your password again.");

            }


            String token = UUID.randomUUID().toString();
            service.updateResetPasswordToken(token, email);
            String resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;
            mailService.sendEmail(email, resetPasswordLink);

        } catch (UnsupportedEncodingException | MessagingException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }

        return ResponseEntity.ok("We have sent a reset password link to your email. Please check.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> processResetPassword(@RequestBody PasswordDto data) {

        String token = data.getToken();
        String password = data.getNewPassword();

        User user = service.getByResetPasswordToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid token.");
        }

        PasswdResetToken rsttoken = service.getByUser(user);
        if (rsttoken.isTokenExpired())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("This link has expired.");
        if(!Objects.equals(rsttoken.getToken(), token))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid token.");


        service.updatePassword(user, password);



        return ResponseEntity.ok("Changed password successfully.");
    }


}

