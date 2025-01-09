package com.example.productservicebackend;

import com.example.productservicebackend.entities.Categorie;
import com.example.productservicebackend.entities.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ProductServiceBackendApplication implements CommandLineRunner {
    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceBackendApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        repositoryRestConfiguration.exposeIdsFor(Produit.class);
        repositoryRestConfiguration.exposeIdsFor(Categorie.class);
    }
}
