package ma.autocash.backend.entities;


import jakarta.persistence.*;
import lombok.*;
import ma.autocash.backend.enums.VoitureType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "voiture")
@EntityListeners(AuditingEntityListener.class)
@Data
public class VoitureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "prix", nullable = false)
    private Integer prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marque_id", nullable = false)
    private MarqueEntity marque;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modele_id", nullable = false)
    private ModeleEntity modele;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendeur_id", nullable = false)
    private VendeurEntity vendeur;

    @Column(name = "annee_mise_circulation", nullable = false)
    private Integer anneeMiseCirculation;

    @Column(name = "mois_mise_circulation", nullable = false)
    private Integer moisMiseCirculation;

    @Column(name = "kilometrage", nullable = false)
    private Integer kilometrage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ville_id", nullable = false)
    private VilleEntity ville;

    @Column(name = "ref", nullable = false, unique = true)
    private String ref;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private VoitureType type;

    @Column(name = "photo", nullable = false)
    private String photo;


    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @PrePersist
    private void generateRef() {
        if (this.ref == null) {
            long timestamp = System.currentTimeMillis() % 100000;
            int randomNum = (int) (Math.random() * 10000);
            this.ref = String.format("%05d%04d", timestamp, randomNum);
        }
        if (this.type == null) {
            this.type = VoitureType.PUBLISHED;
        }
    }
}