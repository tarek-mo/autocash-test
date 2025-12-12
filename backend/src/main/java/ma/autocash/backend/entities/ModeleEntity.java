package ma.autocash.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Data
@Table(
        name = "modele",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"slug", "marque_id"}, name = "uc_modele_slug_marque")
        }
)
public class ModeleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "slug", nullable = false)
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marque_id", nullable = false)
    private MarqueEntity marque;
}