# TP 5: Spring Boot 3 & Angular

This project demonstrates integrating image management into a Spring Boot and Angular application. It covers the entire workflow from backend entity creation to frontend UI updates for handling images.

---

## Objectives

1. Add the `Image` entity on the Spring Boot side.
2. Modify the Angular `AddProduit` component to upload images.
3. Update the Angular `UpdateProduit` component to view images.
4. Add an `image` column to the product list in Angular.
5. Update the Angular `UpdateProduit` component to edit images.
6. Support multiple images per product.
7. Store images in a dedicated directory.

---

## Features

### Backend (Spring Boot)

1. **Image Entity**  
   - Created with properties like `idImage`, `name`, `type`, and `image (byte[])`.
   - Linked to `Produit` as a one-to-one or one-to-many relationship for multiple images.

2. **Services & Repositories**  
   - `ImageService` handles image upload, retrieval, and deletion.
   - `ImageRepository` interacts with the database.

3. **Controllers**  
   - Endpoints for uploading, retrieving, updating, and deleting images.
   - Additional methods for handling images stored in a file system.

4. **Optimizations**  
   - Deletes the old image when a new one is uploaded to avoid database overload.

---

### Frontend (Angular)

1. **Components**
   - **AddProduitComponent**: Allows image upload and previews before submitting.
   - **UpdateProduitComponent**: Displays and updates existing images.
   - **ProduitsComponent**: Lists products, including their images.

2. **Image Management**
   - Support for uploading single and multiple images.
   - Displays the first image of each product in the product list.

3. **Integration**
   - Added file inputs for image uploads in components.
   - Integrated API calls for managing images using `ProduitService`.

4. **File System Support**
   - Enables storing images in a directory and retrieving them via dedicated APIs.

---

## Installation and Usage

1. Clone this repository:
   ```bash
   git clone <repository-url>
