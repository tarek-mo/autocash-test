package ma.autocash.backend.controller;

import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.GetModeleResponseDTO;
import ma.autocash.backend.service.ModeleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/modeles")
@RequiredArgsConstructor
public class ModeleController {
    private final ModeleService modeleService;
    @GetMapping
    public ResponseEntity<List<GetModeleResponseDTO>> getModelesByMarqueId(@RequestParam(required = false) UUID marqueId) {
        List<GetModeleResponseDTO> modeles = modeleService.findAll(marqueId);
        return ResponseEntity.ok(modeles);
    }

}
