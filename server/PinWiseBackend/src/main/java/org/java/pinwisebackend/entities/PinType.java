package org.java.pinwisebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "pin_type")
@Table(name = "pin_type")
public class PinType {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_pin_type")
    private Categories categories;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "nameof", nullable = false)
    private String nameOf;

}
