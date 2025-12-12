package ma.autocash.backend.repository;

import ma.autocash.backend.entities.VendeurEntity;
import ma.autocash.backend.entities.VoitureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface VendeurRepository extends JpaRepository<VendeurEntity, UUID> {
}
