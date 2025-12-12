package ma.autocash.backend.service;

import ma.autocash.backend.dto.CreateVoitureRequestDTO;
import ma.autocash.backend.dto.CreateVoitureResponseDTO;
import ma.autocash.backend.dto.GetVoitureResponseDTO;
import ma.autocash.backend.entities.*;
import ma.autocash.backend.exception.FileProcessingException;
import ma.autocash.backend.exception.marque.MarqueNotFoundException;
import ma.autocash.backend.exception.modele.ModeleNotFoundException;
import ma.autocash.backend.exception.ville.VilleNotFoundException;
import ma.autocash.backend.exception.voiture.InvalidVoiturePhotoException;
import ma.autocash.backend.mapper.VoitureMapper;
import ma.autocash.backend.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoitureService {

    private final VoitureRepository voitureRepository;
    private final VendeurService vendeurService;
    private final MarqueService marqueService;
    private final ModeleService modeleService;
    private final VilleService villeService;
    private final VoitureMapper voitureMapper;

    @Value("${app.upload-dir:uploads/voiture_photos/}")
    private String uploadDir;

    @Transactional
    public CreateVoitureResponseDTO createVoiture(
            CreateVoitureRequestDTO voitureRequestDTO,
            MultipartFile photoFile) {

        if (photoFile.isEmpty() || photoFile.getSize() == 0) {
            throw new InvalidVoiturePhotoException("Le fichier photo est manquant ou vide.");
        }

        MarqueEntity marque = marqueService.findById(voitureRequestDTO.getMarqueId())
                .orElseThrow(() -> new MarqueNotFoundException("Marque non trouvée avec ID: " + voitureRequestDTO.getMarqueId()));

        ModeleEntity modele = modeleService.findById(voitureRequestDTO.getModeleId())
                .orElseThrow(() -> new ModeleNotFoundException("Modèle non trouvé avec ID: " + voitureRequestDTO.getModeleId()));

        VilleEntity voitureVille = villeService.findById(voitureRequestDTO.getVilleId())
                .orElseThrow(() -> new VilleNotFoundException("Ville de la voiture non trouvée avec ID: " + voitureRequestDTO.getVilleId()));

        VilleEntity vendeurVille = villeService.findById(voitureRequestDTO.getVendeur().getVilleId())
                .orElseThrow(() -> new VilleNotFoundException("Ville du vendeur non trouvée avec ID: " + voitureRequestDTO.getVendeur().getVilleId()));

        VendeurEntity vendeur = vendeurService.createVendeur(voitureRequestDTO.getVendeur(), vendeurVille);

        String photoFileName = UUID.randomUUID().toString() + "_" + photoFile.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);

        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(photoFileName);
            Files.copy(photoFile.getInputStream(), filePath);

            VoitureEntity voiture = new VoitureEntity();
            voiture.setPrix(voitureRequestDTO.getPrix());
            voiture.setAnneeMiseCirculation(voitureRequestDTO.getAnneeMiseCirculation());
            voiture.setMoisMiseCirculation(voitureRequestDTO.getMoisMiseCirculation());
            voiture.setKilometrage(voitureRequestDTO.getKilometrage());
            voiture.setPhoto(photoFileName);

            voiture.setMarque(marque);
            voiture.setModele(modele);
            voiture.setVendeur(vendeur);
            voiture.setVille(voitureVille);

            log.debug("Saving voiture with marque={}, modele={}, vendeur={}, ville={}", 
                marque.getId(), modele.getId(), vendeur.getId(), voitureVille.getId());
            
            voiture = voitureRepository.save(voiture);
            
            log.info("Voiture created successfully with ID: {}", voiture.getId());

            return voitureMapper.toVoitureResponseDTO(voiture);
        } catch (IOException e) {
            log.error("File processing error: ", e);
            throw new FileProcessingException("Erreur lors de l'enregistrement du fichier photo: " + e.getMessage());
        } catch (Exception e) {
            log.error("Error creating voiture: ", e);
            throw new RuntimeException("Erreur lors de la création de la voiture: " + e.getMessage(), e);
        }
    }

    @Transactional(readOnly = true)
    public List<GetVoitureResponseDTO> getAllVoitures(String searchQuery) {

        List<VoitureEntity> voitures = voitureRepository.findAllWithFilters(searchQuery);

        return voitures.stream()
                .map(voitureMapper::toVoitureItemDTO)
                .collect(Collectors.toList());
    }
}