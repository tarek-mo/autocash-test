package ma.autocash.backend.controller;

import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.GetVilleResponseDTO;
import ma.autocash.backend.service.VilleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/villes")
@RequiredArgsConstructor
public class VilleController {
    private final VilleService villeService;

    @GetMapping
    public ResponseEntity<List<GetVilleResponseDTO>> getAllVilles() {
        List<GetVilleResponseDTO> villes = villeService.findAll();
        return ResponseEntity.ok(villes);
    }
}
