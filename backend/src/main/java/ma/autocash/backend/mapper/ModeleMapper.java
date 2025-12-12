package ma.autocash.backend.mapper;

import ma.autocash.backend.dto.GetModeleResponseDTO;
import ma.autocash.backend.entities.ModeleEntity;
import org.springframework.stereotype.Component;

@Component
public class ModeleMapper {
    public GetModeleResponseDTO toModeleResponseDTO(ModeleEntity modeleEntity) {
        GetModeleResponseDTO dto = new GetModeleResponseDTO();
        dto.setId(modeleEntity.getId().toString());
        dto.setNom(modeleEntity.getNom());
        dto.setSlug(modeleEntity.getSlug());
        return dto;
    }

}
