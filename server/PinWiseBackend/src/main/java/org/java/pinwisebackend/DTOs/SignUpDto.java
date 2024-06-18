package org.java.pinwisebackend.DTOs;

public record SignUpDto(
        String email,
        String username,
        String password,
        String gender,
        String education,
        Integer age
) {
}
