import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur.model";
import {AbstractControl} from "@angular/forms";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class UtilisateurServiceService {

  private baseUrl="http://localhost:4300/RhestIA"



  constructor(private http:HttpClient) { }


  inscription(utilisateur:Utilisateur): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/Utilisateur/inscription`, utilisateur);
  }


  Connexion(utilisateur:Utilisateur):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/Utilisateur/Connexion`, utilisateur);
  }

  getAllUtilisateurs():Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/ListeDesUtilisateurs`)
  }

  public deleteUtilisateur(id:number):Observable<any>{
    const response = this.http.delete(`${this.baseUrl}/SupprimerUtilisateur/${id}`);
    console.log(response);
    return response;
  }

  login(nomUtilisateur:any, password:any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/Utilisateur/Connexion`, {nomUtilisateur,password},
      httpOptions)
  }

  blockUser(idUtilisateur: number) {
    const url = `${this.baseUrl}/${idUtilisateur}/block`;
    return this.http.post(url,null);
  }

  unblockUser(idUtilisateur: number) {
    const url = `${this.baseUrl}/${idUtilisateur}/unblock`;
    return this.http.post(url,null);
  }

  public ModifierUtilisateurById(utilisateur:Utilisateur):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/ModifierUtilisateur`,utilisateur);
  }

}
