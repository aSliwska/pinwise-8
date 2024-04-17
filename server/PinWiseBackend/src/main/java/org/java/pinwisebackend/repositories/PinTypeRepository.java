package org.java.pinwisebackend.repositories;

import org.java.pinwisebackend.entities.PinType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinTypeRepository extends JpaRepository<PinType,Long> {
}
