package ma.autocash.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetModeleResponseDTO {
    private String id;
    private String nom;
    private String slug;
}