package ma.autocash.backend.repository;

import ma.autocash.backend.entities.MarqueEntity;
import ma.autocash.backend.entities.VoitureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MarqueRepository extends JpaRepository<MarqueEntity, UUID> {
    Optional<MarqueEntity> findById(UUID id);

}
