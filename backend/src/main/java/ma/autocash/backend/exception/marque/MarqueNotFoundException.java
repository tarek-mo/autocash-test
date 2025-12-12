package ma.autocash.backend.exception.marque;

public class MarqueNotFoundException extends RuntimeException {
    public MarqueNotFoundException(String message) {
        super(message);
    }
}
