package org.java.pinwisebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "passwd_token")
@Table(name = "passwd_token")
public class PasswdResetToken {
    public static final int EXPIRATION = 60 * 24;

    public PasswdResetToken(String token, User user)
    {
        this.user = user;
        this.token = token;
        this.expiryDate =  LocalDateTime.now().plusMinutes(EXPIRATION);
    }



    public boolean isTokenExpired() {
        LocalDateTime now = LocalDateTime.now();
        return expiryDate.isBefore(now);
    }

    public boolean isTokenCooldown() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime cooldownTime = expiryDate.minusMinutes(EXPIRATION - 1);
        return cooldownTime.isAfter(now);
    }


    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "token", nullable = false)
    private String token;


    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(nullable = false, name = "id")
    private User user;

    @Column(name = "expiry_date", nullable = false)
    private LocalDateTime expiryDate;
}