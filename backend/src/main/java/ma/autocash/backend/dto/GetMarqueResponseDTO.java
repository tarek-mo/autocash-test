package ma.autocash.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetMarqueResponseDTO {
    private String id;
    private String nom;
    private String slug;
}
