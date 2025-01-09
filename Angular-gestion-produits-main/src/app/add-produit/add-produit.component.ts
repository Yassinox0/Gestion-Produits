import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Image} from "../model/Image.model";

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent implements OnInit {

  newProduit = new Produit();
  message! : string;
  uploadedImage!: File;
  imagePath: any;
  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;


  constructor(private produitService: ProduitService,
              private router :Router
   ) {}


   ngOnInit(): void {
    this.produitService.listeCategories().
          subscribe(cats => {console.log(cats);
                             this.categories = cats._embedded.categories;
                             }
        );
  }


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }

  addProduit(){

    this.newProduit.categorie = this.categories.find(cat =>cat.idCat

      == this.newIdCat)!;

    this.produitService
      .ajouterProduit(this.newProduit)
      .subscribe((prod) => {
      this.produitService
        .uploadImageFS(this.uploadedImage,

          this.uploadedImage.name,prod.idProduit)

        .subscribe((response: any) => {}
  );
    this.router.navigate(["produits"]);
  });
  }



}
