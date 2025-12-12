package ma.autocash.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetVilleResponseDTO {
    private String id;
    private String slug;
    private String name;
}