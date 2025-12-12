package ma.autocash.backend.controller;


import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.GetMarqueResponseDTO;
import ma.autocash.backend.service.MarqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/marques")
@RequiredArgsConstructor
public class MarqueController {
    private final MarqueService marqueService;


    @GetMapping
    public ResponseEntity<List<GetMarqueResponseDTO>> getAllMarques() {
        List<GetMarqueResponseDTO> marques = marqueService.findAll();
        return ResponseEntity.ok(marques);
    }
}
