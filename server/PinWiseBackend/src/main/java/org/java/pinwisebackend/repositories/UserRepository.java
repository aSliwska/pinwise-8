package org.java.pinwisebackend.repositories;

import org.java.pinwisebackend.entities.PasswdResetToken;
import org.java.pinwisebackend.entities.Pin;
import org.java.pinwisebackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findByUsername(String username);
    User findUserById(long id);
    //User updateUserById(long id);
    void deleteUserById(long id);
    @Query("SELECT u FROM user u where u.email = :email")
    User findUserByEmail(@Param("email") String email);

    @Query("SELECT u FROM user u JOIN passwd_token p on u.id = p.user.id WHERE p.token = :token")
    User findUserByPasswdResetToken(@Param("token") String token);


    User findUserByPasswdResetToken(PasswdResetToken token);

}
