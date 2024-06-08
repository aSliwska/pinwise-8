package org.java.pinwisebackend.repositories;

import org.java.pinwisebackend.entities.PasswdResetToken;
import org.java.pinwisebackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswdResetTokenRepository extends JpaRepository<PasswdResetToken,Long> {
    PasswdResetToken findByUser(User user);

    void deletePasswdResetTokenByUser(User user);
}
