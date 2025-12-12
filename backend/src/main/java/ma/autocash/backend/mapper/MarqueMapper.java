package ma.autocash.backend.mapper;


import ma.autocash.backend.dto.GetMarqueResponseDTO;
import ma.autocash.backend.entities.MarqueEntity;
import org.springframework.stereotype.Component;

@Component
public class MarqueMapper {

    public GetMarqueResponseDTO toGetMarqueResponseDTO(MarqueEntity marqueEntity) {
        GetMarqueResponseDTO dto = new GetMarqueResponseDTO();
        dto.setId(marqueEntity.getId().toString());
        dto.setNom(marqueEntity.getNom());
        dto.setSlug(marqueEntity.getSlug());
        return dto;
    }

}
