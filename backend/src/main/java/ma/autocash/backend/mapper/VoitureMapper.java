package ma.autocash.backend.mapper;

import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.*;
import ma.autocash.backend.entities.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class VoitureMapper {

    private final MarqueMapper marqueMapper;
    private final ModeleMapper modeleMapper;
    private final VilleMapper villeMapper;

    public CreateVoitureResponseDTO toVoitureResponseDTO(VoitureEntity entity) {
        CreateVoitureResponseDTO response = new CreateVoitureResponseDTO();

        response.setId(entity.getId());
        response.setPrix(entity.getPrix());
        response.setAnneeMiseCirculation(entity.getAnneeMiseCirculation());
        response.setMoisMiseCirculation(entity.getMoisMiseCirculation());
        response.setKilometrage(entity.getKilometrage());
        response.setRef(entity.getRef());
        response.setType(entity.getType().toString());

        String photoUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(entity.getPhoto())
                .toUriString();
        response.setPhotoUrl(photoUrl);

        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());

        response.setMarque(marqueMapper.toGetMarqueResponseDTO(entity.getMarque()));
        response.setModele(modeleMapper.toModeleResponseDTO(entity.getModele()));
        response.setVille(villeMapper.toVilleResponseDTO(entity.getVille()));

        VendeurEntity vendeurEntity = entity.getVendeur();
        response.setVendeur(new CreateVendeurResponseDTO(
                vendeurEntity.getId(),
                vendeurEntity.getType().toString(),
                vendeurEntity.getNom(),
                vendeurEntity.getTel(),
                vendeurEntity.getEmail(),
                vendeurEntity.getAdresse()
        ));

        return response;
    }


    public GetVoitureResponseDTO toVoitureItemDTO(VoitureEntity entity) {
        GetVoitureResponseDTO dto = new GetVoitureResponseDTO();

        dto.setId(entity.getId().toString());
        dto.setPrix(entity.getPrix());
        dto.setAnneeMiseCirculation(entity.getAnneeMiseCirculation());
        dto.setMoisMiseCirculation(entity.getMoisMiseCirculation());
        dto.setKilometrage(entity.getKilometrage());
        dto.setRef(entity.getRef());
        dto.setType(entity.getType().toString());

        String photoUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(entity.getPhoto())
                .toUriString();
        dto.setPhotoUrl(photoUrl);

        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        dto.setMarque(marqueMapper.toGetMarqueResponseDTO(entity.getMarque()));
        dto.setModele(modeleMapper.toModeleResponseDTO(entity.getModele()));
        dto.setVille(villeMapper.toVilleResponseDTO(entity.getVille()));

        VendeurEntity vendeurEntity = entity.getVendeur();
        dto.setVendeur(new CreateVendeurResponseDTO(
                vendeurEntity.getId(),
                vendeurEntity.getType().toString(),
                vendeurEntity.getNom(),
                vendeurEntity.getTel(),
                vendeurEntity.getEmail(),
                vendeurEntity.getAdresse()
        ));

        return dto;
    }
}