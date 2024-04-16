package org.java.pinwisebackend.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers("/api/**").permitAll() // Allow access to /api/** without authentication
                .anyRequest().authenticated() // Require authentication for all other requests
                .and()
                .csrf().disable(); // Disable CSRF (Cross-Site Request Forgery) protection for simplicity

        return http.build();
    }
}
