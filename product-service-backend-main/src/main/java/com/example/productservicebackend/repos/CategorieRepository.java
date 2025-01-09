package com.example.productservicebackend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.productservicebackend.entities.Categorie;

@RepositoryRestResource(path = "cat")
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

}
