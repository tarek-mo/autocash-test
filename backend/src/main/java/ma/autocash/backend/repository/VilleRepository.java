package ma.autocash.backend.repository;

import ma.autocash.backend.entities.VilleEntity;
import ma.autocash.backend.entities.VoitureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VilleRepository extends JpaRepository<VilleEntity, UUID> {
    Optional<VilleEntity> findById(UUID id);

}
