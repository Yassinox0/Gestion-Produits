package com.example.productservicebackend.repos;

import com.example.productservicebackend.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository  extends JpaRepository<Image, Long> {
    void deleteById(Class<?> oldProdImageId);
}
