package ma.autocash.backend.service;

import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.GetModeleResponseDTO;
import ma.autocash.backend.entities.ModeleEntity;
import ma.autocash.backend.exception.marque.MarqueNotFoundException;
import ma.autocash.backend.mapper.ModeleMapper;
import ma.autocash.backend.repository.ModeleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ModeleService {
    private final ModeleRepository modeleRepository;
    private final MarqueService marqueService;
    private final ModeleMapper modeleMapper;
    Optional<ModeleEntity> findById(UUID id) {
        return modeleRepository.findById(id);
    }


    public List<GetModeleResponseDTO> findAll(UUID marqueId) {
        List<ModeleEntity> modeleEntities;

        if (marqueId == null) {
            modeleEntities = modeleRepository.findAll();
        } else {
            marqueService.findById(marqueId)
                    .orElseThrow(() -> new MarqueNotFoundException("Marque not found with id: " + marqueId));
            modeleEntities = modeleRepository.findByMarqueId(marqueId);
        }

        return modeleEntities.stream()
                .map(modeleMapper::toModeleResponseDTO)
                .toList();

    }


}
