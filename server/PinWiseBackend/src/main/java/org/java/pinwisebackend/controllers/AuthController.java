package org.java.pinwisebackend.controllers;


import com.auth0.jwt.exceptions.JWTVerificationException;
import org.java.pinwisebackend.DTOs.JwtDto;
import org.java.pinwisebackend.DTOs.SignInDto;
import org.java.pinwisebackend.DTOs.SignUpDto;
import org.java.pinwisebackend.configurations.TokenProvider;
import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService service;
    @Autowired
    private TokenProvider tokenService;

    @PostMapping("/register")
    public ResponseEntity<?> signUp(@RequestBody SignUpDto data) {
        try {
            service.signUp(data);
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


}

