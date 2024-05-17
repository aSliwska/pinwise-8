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

//    @ManyToMany(mappedBy = "pins")
//    private List<PinType> pinTypes;

    @Column(name = "coordinatex")
    private Double coordinateX;

    @Column(name = "coordinatey")
    private Double coordinateY;

}
