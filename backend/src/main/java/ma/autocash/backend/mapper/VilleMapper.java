package ma.autocash.backend.mapper;

import ma.autocash.backend.dto.GetVilleResponseDTO;
import ma.autocash.backend.entities.VilleEntity;
import org.springframework.stereotype.Component;

@Component
public class VilleMapper {

    public GetVilleResponseDTO toVilleResponseDTO(VilleEntity villeEntity) {
        GetVilleResponseDTO dto = new GetVilleResponseDTO();
        dto.setId(villeEntity.getId().toString());
        dto.setSlug(villeEntity.getSlug());
        dto.setName(villeEntity.getName());
        return dto;
    }
}
