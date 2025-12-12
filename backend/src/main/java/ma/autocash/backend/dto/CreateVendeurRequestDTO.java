package ma.autocash.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateVendeurRequestDTO {

    @NotBlank(message = "Le type de vendeur est requis.")
    @Pattern(regexp = "PROFESSIONAL|INDIVIDUAL|DEALER",
            message = "Le type de vendeur doit être PROFESSIONAL, INDIVIDUAL, ou DEALER.")
    private String type;

    @NotBlank(message = "Le nom du vendeur est requis.")
    @Size(max = 100, message = "Le nom ne doit pas dépasser 100 caractères.")
    private String nom;

    @NotBlank(message = "Le numéro de téléphone est requis.")
    @Pattern(regexp = "^\\+?[0-9\\s()-]{7,20}$",
            message = "Le format du numéro de téléphone est invalide.")
    private String tel;

    @NotBlank(message = "L'email est requis.")
    @Email(message = "Le format de l'adresse email est invalide.")
    private String email;

    @NotNull(message = "L'identifiant de la ville est requis.")
    private UUID villeId;

    @NotBlank(message = "L'adresse est requise.")
    @Size(max = 255, message = "L'adresse ne doit pas dépasser 255 caractères.")
    private String adresse;
}