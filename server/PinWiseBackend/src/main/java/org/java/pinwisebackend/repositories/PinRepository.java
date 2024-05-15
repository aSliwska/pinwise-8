package org.java.pinwisebackend.repositories;

import org.java.pinwisebackend.entities.Pin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinRepository extends JpaRepository<Pin,Long> {
}
