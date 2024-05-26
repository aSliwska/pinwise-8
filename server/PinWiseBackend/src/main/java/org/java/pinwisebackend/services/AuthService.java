package org.java.pinwisebackend.services;

import com.auth0.jwt.exceptions.InvalidClaimException;
import org.java.pinwisebackend.DTOs.SignUpDto;
import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) {
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

}