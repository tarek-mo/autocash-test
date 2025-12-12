package ma.autocash.backend.repository;

import ma.autocash.backend.entities.ModeleEntity;
import ma.autocash.backend.entities.VoitureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ModeleRepository extends JpaRepository<ModeleEntity, UUID> {
    Optional<ModeleEntity> findById(UUID id);

    List<ModeleEntity> findByMarqueId(UUID marqueId);
}
