import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import Swal from "sweetalert2";
import {UtilisateurServiceService} from "../../../core/services/utilisateur-service.service";
import {Utilisateur} from "../../../core/models/utilisateur.model";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

/**
 * Info Component
 */
export class InfoComponent implements OnInit {

   // bread crumb items
   breadCrumbItems!: Array<{}>;
   public firstColleaps = true;

   utilisateur : any[];

  constructor(private utilisateurServiceService:UtilisateurServiceService,private router:Router,public tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Accueil', link:'' },
      { label: 'Mon compte', link:'/account/info' },
      { label: 'Informations personnelles', active: true }
    ];
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
}

deconnexion(){
     this.tokenStorage.signOut()
}

  deleteUtilisateur(idUtilisateur:any)
  {
    //this.idUtilisateur = this.route.snapshot.params['id'];
    Swal.fire({
      title: 'Cet utilisateur va être supprimer définitivement\n\r',
      text: "Êtes vous sûr(e)s ? »",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText:'Retour'
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        this.utilisateurServiceService.deleteUtilisateur(idUtilisateur).subscribe((ans: any)=>{
          this.tokenStorage.signOut();
          this.router.navigate(['']);
        });
        // Swal.fire(
        //   'Supprimée',
        //   "L'utilisateur ",
        //   'success'
        // )

      }
      if (result.isDismissed){
        this.router.navigate(['pages/account/info']);
      }
    })
  }

  modifierUtilisateur(){
     // @ts-ignore
    var nom = document.getElementById('NewNom') === null ? this.tokenStorage.getUser()["nom"] : document.getElementById('NewNom').value;
    // @ts-ignore
    var email = document.getElementById('NewEmail') === null ? this.tokenStorage.getUser()["email"] : document.getElementById('NewEmail').value;
    // @ts-ignore
    var numTel = document.getElementById('NewNumTel') === null ? this.tokenStorage.getUser()["numTel"] : document.getElementById('NewNumTel').value;
    // @ts-ignore
    var adresse = document.getElementById('NewAdresse') === null ? this.tokenStorage.getUser()["adresse"] : document.getElementById('NewAdresse').value;
    var utilisateur: Utilisateur;
    utilisateur = this.tokenStorage.getUser();
    utilisateur.nom = nom
    utilisateur.email = email
    utilisateur.numTel = numTel
    utilisateur.adresse = adresse
     this.utilisateurServiceService.ModifierUtilisateurById(utilisateur).subscribe((rep:any)=>{
       this.tokenStorage.saveUser(rep)
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Vos informations ont été modifié avec succés',
         showConfirmButton: false,
         timer: 3000
       })
     })

  }

}
