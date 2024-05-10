import { Component, OnInit } from '@angular/core';

import { works, teams, customers, highlights } from './about.model';
import { worksData, teamData, customersData, highlightsData } from './data';
import {Utilisateur} from "../../../core/models/utilisateur.model";
import {UtilisateurServiceService} from "../../../core/services/utilisateur-service.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

/**
 * About Component
 */
export class AboutComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  worksData!: works[];
  teamData!: teams[];
  customersData!: customers[];
  highlightsData!: highlights[];
  utilisateur: any[];
  utilisateurs:Utilisateur
  idUtilisateur:number

  constructor(private utilisateurServiceService:UtilisateurServiceService,private router:Router,private route:ActivatedRoute,public tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Accueil', link:'' },
      { label: 'Liste des utilisateurs', active: true }
    ];

    // Data Get Function
    this._fetchData();

    this.utilisateurServiceService.getAllUtilisateurs().subscribe(ans =>{
      this.utilisateur=ans
      console.log(ans)
    })
  }

  deleteUtilisateur(idUtilisateur:number)
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

        this.utilisateurServiceService.deleteUtilisateur(idUtilisateur).subscribe((ans:any)=>{
          this.ngOnInit();
        });
        // Swal.fire(
        //   'Supprimée',
        //   "L'utilisateur ",
        //   'success'
        // )

      }
      if (result.isDismissed){
        this.router.navigate(['pages/about']);
      }
    })
  }


  blockUser(idUtilisateur: number) {
    this.utilisateurServiceService.blockUser(idUtilisateur)
      .subscribe(
        () => {
          this.ngOnInit();
          console.log('User blocked successfully');

          // Handle success or show a notification
        },
        error => {
          console.error('Error blocking user:', error);
          // Handle error or show an error message
        }
      );
  }

  unblockUser(idUtilisateur: number) {
    this.utilisateurServiceService.unblockUser(idUtilisateur)
      .subscribe(
        () => {
          console.log('User unblocked successfully');
          this.ngOnInit();
          // Handle success or show a notification
        },
        error => {
          console.error('Error unblocking user:', error);
          // Handle error or show an error message
        }
      );

  }


  // Data Fetch
  private _fetchData() {
    this.worksData = worksData;
    this.teamData = teamData;
    this.customersData = customersData;
    this.highlightsData = highlightsData;
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    navigation: true,
    loop:true
  };

  /**
   * Swiper setting
   */
   team = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 4,
      }
    }
  };

  /**
   * Swiper setting
   */
   partners = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 25,
    pagination:true,
    loop:true,
    breakpoints:{
      768:{
        slidesPerView: 4,
      },
      1200:{
        slidesPerView: 6,
      }
    }
  };

  /**
   * Swiper Customers setting
   */
   customers = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 25,
  };

  /**
   * Swiper setting
   */
   blogs = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 25,
    pagination: true,
    loop:true,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 3,
      }
    }
  };

}
