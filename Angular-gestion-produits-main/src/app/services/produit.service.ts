import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/catgorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/Image.model';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[];
  produit!: Produit;
  categories!: Categorie[];

  newProduit: Produit = new Produit();  // Added missing newProduit property
  newIdCat: number = 0;                // Added missing newIdCat property
  apiURL: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {}

  listeProduit(): Observable<Produit[]> {
    let jwt = "Bearer " + this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Produit[]>(`${this.apiURL}/all`, { headers: httpHeaders });
  }

  ajouterProduit( prod: Produit):Observable<Produit>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Produit>(this.apiURL+"/addprod", prod, {headers:httpHeaders});
  }


  // Separated the server call from the method for better clarity
  ajouterProduitToServer(produit: Produit): Observable<Produit> {
    let jwt = "Bearer " + this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Produit>(`${this.apiURL}/addprod`, produit, { headers: httpHeaders });
  }



  supprimerProduit(id: number) {
    let jwt = "Bearer " + this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    const url = `${this.apiURL}/delprod/${id}`;
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterProduit(id: number): Observable<Produit> {
    let jwt = "Bearer " + this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }

  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = "Bearer " + this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Produit>(`${this.apiURL}/updateprod`, prod, { headers: httpHeaders });
  }

  listeCategories(): Observable<CategorieWrapper> {
    let jwt = "Bearer " + this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<CategorieWrapper>(this.apiURLCat, { headers: httpHeaders });
  }

  consulterCategorie(id: number): Categorie {
    return this.categories.find(cat => cat.idCat == id)!;
  }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL}/image/upload`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL}/image/get/info/${id}`;
    return this.http.get<Image>(url);
  }
  uploadImageProd(file: File, filename: string, idProd:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append("image", file, filename);
    const url = `${this.apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id : number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append("image", file, filename);
    const url = `${this.apiURL + "/image/uploadFS"}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

}
