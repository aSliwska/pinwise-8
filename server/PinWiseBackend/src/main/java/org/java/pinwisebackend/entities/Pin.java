package org.java.pinwisebackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "pin")
@Table(name = "pin")
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    //@MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id", nullable = false)
    private PinType type;

    @Column(name = "coordinatex")
    private Double coordinateX;

    @Column(name = "coordinatey")
    private Double coordinateY;

    @Column(name = "adres")
    private String adres;

    //@Column(name = "id_serwis")
    //private Long serwis;

    @Column(name = "modification_date")
    private LocalDateTime modificationDate;

    @Column(name = "company_name")
    private String companyName;

    @ManyToOne(fetch = FetchType.LAZY)
    //@MapsId
    @JoinColumn(name = "id_serwis", nullable = false)
    private Service service;

}
