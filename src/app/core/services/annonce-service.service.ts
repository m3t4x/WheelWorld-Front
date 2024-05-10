import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
  from '@angular/forms';
import {Annonce} from "../models/annonce.model";
@Injectable({
  providedIn: 'root'
})
export class AnnonceServiceService {

  private baseUrl="http://localhost:4300/RhestIA"

  public dataForm!: FormGroup;
  constructor(private http:HttpClient) {  }

  ////////////////////////////// Prediction ////////////////////////////////////////

  calculatePrice(url: String, data: any):Observable<any>
  {
    console.log(url);
    return this.http.post(`${url}`, data);
  }

  ////////////////////////////////// Annonce /////////////////////////////////////

  addAnnonce(annonce: Annonce):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/addAnnonce`, annonce);
  }
  getAllAnnonces():Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/ListeDesAnnonces`)
  }

  public deleteAnnonce(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/supprimerAnnonce/${id}`);
  }

  public getAnnonceById(id:number):Observable<Annonce>{
    return this.http.get<Annonce>(`${this.baseUrl}/annonce/${id}`);
  }

  public updateAnnonce(id:number):Observable<Annonce>{
    return this.http.get<Annonce>(`${this.baseUrl}/modifierAnnonce/${id}`)
  }

  public getVenteAnnonce(filter?: any):Observable<any>
  {
    const params:any = {}
    if (filter) {
      if(filter?.typeVehicule){
        params['typeVehicule']= filter?.typeVehicule
      }
      if(filter?.nbCylindre){
        params['nbCylindre']= filter?.nbCylindre
      }
      if(filter?.boiteVitesse){
        params['boiteVitesse']= filter?.boiteVitesse
      }
      if(filter?.marque){
        params['marque']= filter?.marque
      }
      if(filter?.minPrice){
        params['minPrice']= filter?.minPrice
      }
      if(filter?.maxPrice){
        params['maxPrice']= filter.maxPrice
      }
    }
    return this.http.get<Annonce[]>(`${this.baseUrl}/Vente`,{params:params})
  }

  public getLocationAnnonce(filter?: any):Observable<any>
  {
    const params:any = {}
    if (filter) {
      if(filter?.typeVehicule){
        params['typeVehicule']= filter?.typeVehicule
      }
      if(filter?.nbCylindre){
        params['nbCylindre']= filter?.nbCylindre
      }
      if(filter?.boiteVitesse){
        params['boiteVitesse']= filter?.boiteVitesse
      }
      if(filter?.marque){
        params['marque']= filter?.marque
      }
      if(filter?.minPrice){
        params['minPrice']= filter?.minPrice
      }
      if(filter?.maxPrice){
        params['maxPrice']= filter.maxPrice
      }
    }
    return this.http.get<Annonce[]>(`${this.baseUrl}/Location`,{params})
  }
}
/////////////////////////////////////////////////////////////////////////////
