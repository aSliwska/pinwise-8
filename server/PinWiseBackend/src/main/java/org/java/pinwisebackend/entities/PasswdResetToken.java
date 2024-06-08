package org.java.pinwisebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "passwd_token")
@Table(name = "passwd_token")
public class PasswdResetToken {
    private static final int EXPIRATION = 60 * 24;

    public PasswdResetToken(String token, User user)
    {
        this.user = user;
        this.token = token;

        final Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(System.currentTimeMillis()));
        cal.add(Calendar.MINUTE, EXPIRATION);
        this.expiryDate = new Date( cal.getTime().getTime());
    }

    private boolean isTokenExpired() {
        final Calendar cal = Calendar.getInstance();
        return this.expiryDate.before(cal.getTime());
    }

    private boolean isTokenCooldown() {
        final Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, EXPIRATION-5);
        return cal.getTime().before(this.expiryDate);
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
    private Date expiryDate;
}