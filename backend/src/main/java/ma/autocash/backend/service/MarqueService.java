package ma.autocash.backend.service;

import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.GetMarqueResponseDTO;
import ma.autocash.backend.entities.MarqueEntity;
import ma.autocash.backend.mapper.MarqueMapper;
import ma.autocash.backend.repository.MarqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MarqueService {
    private final MarqueRepository marqueRepository;
    private final MarqueMapper marqueMapper;

    Optional<MarqueEntity> findById(UUID id) {
        return marqueRepository.findById(id);
    }

    public List<GetMarqueResponseDTO> findAll() {
        return marqueRepository.findAll()
                .stream()
                .map(marqueMapper::toGetMarqueResponseDTO)
                .toList();
    }

}
