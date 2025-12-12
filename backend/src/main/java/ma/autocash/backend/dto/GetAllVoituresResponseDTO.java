package ma.autocash.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllVoituresResponseDTO {
    private List<GetVoitureResponseDTO> voitures;
    private int total;
}