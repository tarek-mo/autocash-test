package ma.autocash.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateVoitureRequestDTO {

    @NotNull(message = "Le prix est requis.")
    @PositiveOrZero(message = "Le prix ne peut pas être négatif.")
    private Integer prix;

    @NotNull(message = "L'identifiant de la marque est requis.")
    private UUID marqueId;

    @NotNull(message = "L'identifiant du modèle est requis.")
    private UUID modeleId;

    @Valid
    @NotNull(message = "Les informations du vendeur sont requises.")
    private CreateVendeurRequestDTO vendeur;

    @NotNull(message = "L'année de mise en circulation est requise.")
    @Min(value = 1900, message = "L'année de mise en circulation doit être valide.")
    private Integer anneeMiseCirculation;

    @NotNull(message = "Le mois de mise en circulation est requis.")
    @Min(value = 1, message = "Le mois doit être compris entre 1 et 12.")
    @Max(value = 12, message = "Le mois doit être compris entre 1 et 12.")
    private Integer moisMiseCirculation;

    @NotNull(message = "Le kilométrage est requis.")
    @PositiveOrZero(message = "Le kilométrage ne peut pas être négatif.")
    private Integer kilometrage;

    @NotNull(message = "L'identifiant de la ville est requis.")
    private UUID villeId;


}