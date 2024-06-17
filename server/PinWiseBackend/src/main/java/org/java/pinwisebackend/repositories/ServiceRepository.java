package org.java.pinwisebackend.repositories;

import org.java.pinwisebackend.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service,Long> {
}
