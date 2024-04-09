package org.java.pinwisebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Categories {
    @OneToMany
    @MapsId
    @JoinColumn(name = "id_pin", nullable = false)
    private List<Pin> pin;

    @OneToMany
    @MapsId
    @JoinColumn(name = "id_pin_type", nullable = false)
    private List<PinType> pinType;
}
