package com.example.productservicebackend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import com.example.productservicebackend.repos.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.productservicebackend.entities.Categorie;
import com.example.productservicebackend.entities.Produit;
import com.example.productservicebackend.repos.ProduitRepository;

@Service
public class ProduitServiceImpl implements ProduitService {

	@Autowired
	ProduitRepository produitRepository;
    @Autowired
    private ImageRepository imageRepository;


	@Override
	public Produit saveProduit(Produit p) {
		return produitRepository.save(p);
		
	}

	/*@Override
	public Produit updateProduit(Produit p) {
		return produitRepository.save(p);
		
	}*/

    @Override
    public Produit updateProduit(Produit p) {
        Produit oldProduit = this.getProduit(p.getIdProduit()); // Fetch the actual Produit entity
        Class<?> oldProdImageId = oldProduit.getImage().getClass(); // Access the image ID correctly
        Class<?> newProdImageId = p.getImage().getClass();

        Produit prodUpdated = produitRepository.save(p);

        if (!oldProdImageId.equals(newProdImageId)) { // Compare the IDs correctly
            imageRepository.deleteById(oldProdImageId); // Delete the old image if changed
        }
        return prodUpdated;
    }


	@Override
	public void deleteProduit(Produit p) {
		produitRepository.delete(p);

	}
    @Override
    public void deleteProduitById(Long id) {
        Produit p = getProduit(id);
//suuprimer l&#39;image avant de supprimer le produit
        try {

            Files.delete(Paths.get(System.getProperty("user.home")+ "/images/" +p.getImagePath()));

        } catch (IOException e) {
            e.printStackTrace();
        }
        produitRepository.deleteById(id);
    }



	@Override
	public Produit getProduit(Long id) {
		return  produitRepository.findById(id).get();
	
	}

	@Override
	public List<Produit> getAllProduits() {
		return produitRepository.findAll();
	}
	
    @Override
	public List<Produit> findByNomProduit(String nom) {
		return produitRepository.findByNomProduit(nom);
	}

	@Override
	public List<Produit> findByNomProduitContains(String nom) {
		return produitRepository.findByNomProduitContains(nom);
	}

	@Override
	public List<Produit> findByNomPrix(String nom, Double prix) {
		return produitRepository.findByNomPrix(nom, prix);
	}
	
	@Override
	public List<Produit> findByCategorie(Categorie categorie) {
		return produitRepository.findByCategorie(categorie);
	}

	@Override
	public List<Produit> findByCategorieIdCat(Long id) {
		return produitRepository.findByCategorieIdCat(id);
	}

	@Override
	public List<Produit> findByOrderByNomProduitAsc() {
		return produitRepository.findByOrderByNomProduitAsc();
	}

	@Override
	public List<Produit> trierProduitsNomsPrix() {
		return produitRepository.trierProduitsNomsPrix();
	}


}
