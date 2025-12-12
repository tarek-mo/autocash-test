package ma.autocash.backend.exception;

import ma.autocash.backend.exception.marque.MarqueNotFoundException;
import ma.autocash.backend.exception.modele.ModeleNotFoundException;
import ma.autocash.backend.exception.ville.VilleNotFoundException;
import ma.autocash.backend.exception.voiture.InvalidVoiturePhotoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().getFirst().getDefaultMessage();
        return ResponseEntity.badRequest().body(Map.of("message", errorMessage));
    }

    @ExceptionHandler(MarqueNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleMarqueNotFoundException(MarqueNotFoundException ex) {
        return ResponseEntity.status(404).body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(ModeleNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleModeleNotFoundException(ModeleNotFoundException ex) {
        return ResponseEntity.status(404).body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(VilleNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleVilleNotFoundException(VilleNotFoundException ex) {
        return ResponseEntity.status(404).body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(InvalidVoiturePhotoException.class)
    public ResponseEntity<Map<String, String>> handleInvalidVoiturePhotoException(InvalidVoiturePhotoException ex) {
        return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(FileProcessingException.class)
    public ResponseEntity<Map<String, String>> handleFileProcessingException(FileProcessingException ex) {
        return ResponseEntity.status(500).body(Map.of("message", ex.getMessage()));
    }


}