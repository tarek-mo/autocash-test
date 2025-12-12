package ma.autocash.backend.controller;

import ma.autocash.backend.dto.CreateVoitureRequestDTO;
import ma.autocash.backend.dto.CreateVoitureResponseDTO;
import ma.autocash.backend.dto.GetVoitureResponseDTO;
import ma.autocash.backend.service.VoitureService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/voitures")
@RequiredArgsConstructor
public class VoitureController {

    private final VoitureService voitureService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreateVoitureResponseDTO> createVoiture(
            @RequestPart("photo") @NotNull(message = "Le fichier photo est requis.")
            MultipartFile photo,

            @RequestPart("voitureData") @Valid
            CreateVoitureRequestDTO voitureData
    ) {
        CreateVoitureResponseDTO response = voitureService.createVoiture(voitureData, photo);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * @param search - Search in marque.nom and modele.nom
     */
    @GetMapping
    public ResponseEntity<List<GetVoitureResponseDTO>> getAllVoitures(
            @RequestParam(required = false) String search
    ) {
        List<GetVoitureResponseDTO> voitures = voitureService.getAllVoitures(search);
        return ResponseEntity.ok(voitures);
    }
}