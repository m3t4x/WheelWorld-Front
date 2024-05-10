import {Annonce} from "./annonce.model";
import {TypeUtilisateur} from "./TypeUtilisateur.model";


export class Utilisateur {
  idUtilisateur:number
  nom:string;
  nomUtilisateur:string;
  adresse:string;
  password:string;
  genre:string;
  etatCivil:string;
  email:string;
  numTel:number
  dateDeNaissance:Date;
  roles ='USER'
  type_utilisateur: string;
  isConnected: boolean;
  annonces:Annonce;
  isActive:true;

}
