package ma.autocash.backend.repository;

import ma.autocash.backend.entities.VoitureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VoitureRepository extends JpaRepository<VoitureEntity, UUID> {
    @Query(value = """
SELECT DISTINCT v.*
FROM voiture v
LEFT JOIN marque m ON v.marque_id = m.id
LEFT JOIN modele mo ON v.modele_id = mo.id
WHERE (:searchQuery IS NULL OR
      m.nom ILIKE ('%' || CAST(:searchQuery AS text) || '%') OR
      mo.nom ILIKE ('%' || CAST(:searchQuery AS text) || '%'))
ORDER BY v.created_at DESC
""", nativeQuery = true)
    List<VoitureEntity> findAllWithFilters(
            @Param("searchQuery") String searchQuery
    );


}