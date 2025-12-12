package ma.autocash.backend.service;

import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.GetVilleResponseDTO;
import ma.autocash.backend.entities.VilleEntity;
import ma.autocash.backend.mapper.VilleMapper;
import ma.autocash.backend.repository.VilleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VilleService {
    private final VilleRepository villeRepository;
    private final VilleMapper villeMapper;
    Optional<VilleEntity> findById(UUID id) {
        return villeRepository.findById(id);
    }

    public List<GetVilleResponseDTO> findAll() {
        List<VilleEntity> villes = villeRepository.findAll();
        return villes.stream()
                .map(villeMapper::toVilleResponseDTO)
                .toList();
    }

}
