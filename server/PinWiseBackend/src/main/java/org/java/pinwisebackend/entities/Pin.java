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
@Entity(name = "pin")
@Table(name = "pin")
public class Pin {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(name = "nameof", nullable = false)
    private String nameOf;

    @Column(name = "category")
    private String category;

    @Column(name = "coordinatex")
    private Double coordinateX;

    @Column(name = "coordinatey")
    private Double coordinateY;

}
