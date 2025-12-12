package ma.autocash.backend.exception.voiture;

public class InvalidVoiturePhotoException extends RuntimeException {
    public InvalidVoiturePhotoException(String message) {
        super(message);
    }
}
