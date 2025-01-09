import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';
import { Image } from "../model/Image.model";

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.component.html',
  styles: ``,
})
export class UpdateProduitComponent implements OnInit {
  currentProduit: Produit = new Produit();
  categories: Categorie[] = [];
  updatedCatId!: number;
  myImage!: string;
  uploadedImage: File ;git
  isImageUpdated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
    });
    this.produitService
      .consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentProduit = prod;
        this.updatedCatId = prod.categorie.idCat;
      });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  supprimerImage(img: Image, index: number) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.produitService.supprimerImage(img.idImage).subscribe(() => {
        if (index > -1) {
          this.currentProduit.images.splice(index, 1);
        }
      });
    }
  }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.updatedCatId
    )!;
    if (this.isImageUpdated && this.uploadedImage) {
      this.produitService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentProduit.image = img;
          this.produitService.updateProduit(this.currentProduit).subscribe(() => {
            this.router.navigate(['produits']);
          });
        });
    } else {
      this.produitService
        .updateProduit(this.currentProduit)
        .subscribe(() => {
          this.router.navigate(['produits']);
        });
    }
  }
}
