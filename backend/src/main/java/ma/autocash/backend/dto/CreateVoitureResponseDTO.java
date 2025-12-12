package ma.autocash.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateVoitureResponseDTO {

    private UUID id;
    private Integer prix;

    private GetMarqueResponseDTO marque;
    private GetModeleResponseDTO modele;
    private CreateVendeurResponseDTO vendeur;
    private GetVilleResponseDTO ville;

    private Integer anneeMiseCirculation;
    private Integer moisMiseCirculation;
    private Integer kilometrage;

    private String ref;
    private String type;
    private String photoUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}