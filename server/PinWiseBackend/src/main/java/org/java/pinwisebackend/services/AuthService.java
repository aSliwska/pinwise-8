package org.java.pinwisebackend.services;

import com.auth0.jwt.exceptions.InvalidClaimException;
import org.java.pinwisebackend.DTOs.SignUpDto;
import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.entities.PasswdResetToken;
import org.java.pinwisebackend.repositories.PasswdResetTokenRepository;
import org.java.pinwisebackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Autowired
    PasswdResetTokenRepository passwdResetTokenRepository;

    @Override
    public User loadUserByUsername(String email) {
        return repository.findByEmail(email);
    }

    public UserDetails signUp(SignUpDto data) throws InvalidClaimException {
        if (repository.findByEmail(data.email()) != null)
            throw new InvalidClaimException("E-mail jest już zajęty");

        if(repository.findByUsername(data.username()) != null)
            throw new InvalidClaimException("Nazwa jest już zajęta");


        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.email(),data.username(), encryptedPassword);
        return repository.save(newUser);
    }



    public void updateResetPasswordToken(String token, String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email);
        if (user == null) throw new UsernameNotFoundException("Could not find any user with the email " + email);
        PasswdResetToken passwdtoken = passwdResetTokenRepository.findByUser(user);
        if(passwdtoken == null) //not found
        {
            passwdtoken = new PasswdResetToken(token, user);
        }
        else //existing
        {
            passwdtoken.setToken(token);

        }

        passwdResetTokenRepository.save(passwdtoken);

    }

    public User getByResetPasswordToken(String token) {
        return repository.findUserByPasswdResetToken(token);
    }

    public void updatePassword(User user, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);


        passwdResetTokenRepository.deletePasswdResetTokenByUser(user);
        repository.save(user);
    }





}