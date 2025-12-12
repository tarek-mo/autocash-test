package ma.autocash.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "marque")
@Data
public class MarqueEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "slug", nullable = false, unique = true)
    private String slug;
}