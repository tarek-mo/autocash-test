package ma.autocash.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetVoitureResponseDTO {
    private String id;
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