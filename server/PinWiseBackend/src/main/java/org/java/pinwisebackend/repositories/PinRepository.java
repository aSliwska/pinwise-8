package org.java.pinwisebackend.repositories;

import org.java.pinwisebackend.entities.Pin;
import org.java.pinwisebackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PinRepository extends JpaRepository<Pin,Long> {
    @Modifying
    @Query("DELETE FROM pin p WHERE p.id = :id AND p.user = :user")
    void deleteByIdAndUserId(@Param("id") Long id, @Param("user") User user);

}
