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
@Entity(name = "pin_type")
@Table(name = "pin_type")
public class PinType {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "categories"
            , joinColumns = {
                    @JoinColumn(name = "id_pin_type")
                    }
                    ,inverseJoinColumns = {
                    @JoinColumn(name = "id_pin")
            }
    )
    private List<Pin> pins;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "nameof", nullable = false)
    private String nameOf;

}
