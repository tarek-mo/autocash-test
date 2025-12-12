package ma.autocash.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.autocash.backend.enums.VendeurType;

import java.util.UUID;

@Entity
@Table(name = "vendeur")
@Data
public class VendeurEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private VendeurType type;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "tel", nullable = false)
    private String tel;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ville_id", nullable = false)
    private VilleEntity ville;

    @Column(name = "adresse", nullable = false)
    private String adresse;
}