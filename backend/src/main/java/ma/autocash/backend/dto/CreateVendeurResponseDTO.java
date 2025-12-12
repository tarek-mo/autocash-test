package ma.autocash.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateVendeurResponseDTO {
    private UUID id;
    private String type;
    private String nom;
    private String tel;
    private String email;
    private String adresse;

}