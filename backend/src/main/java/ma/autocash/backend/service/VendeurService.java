package ma.autocash.backend.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.autocash.backend.dto.CreateVendeurRequestDTO;
import ma.autocash.backend.entities.VendeurEntity;
import ma.autocash.backend.entities.VilleEntity;
import ma.autocash.backend.enums.VendeurType;
import ma.autocash.backend.repository.VendeurRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VendeurService {
    private final VendeurRepository vendeurRepository;

    @Transactional
    public VendeurEntity createVendeur(CreateVendeurRequestDTO vendeurDTO, VilleEntity ville) {

        VendeurEntity vendeur = new VendeurEntity();
        vendeur.setNom(vendeurDTO.getNom());
        vendeur.setTel(vendeurDTO.getTel());
        vendeur.setEmail(vendeurDTO.getEmail());
        vendeur.setAdresse(vendeurDTO.getAdresse());
        vendeur.setType(VendeurType.valueOf(vendeurDTO.getType()));
        vendeur.setVille(ville);

        return vendeurRepository.save(vendeur);
    }

}
