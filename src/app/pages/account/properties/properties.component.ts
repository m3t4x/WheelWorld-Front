import { Component, OnInit } from '@angular/core';

import { properties } from './properties.model';
import { propertiesData } from './data';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {AnnonceServiceService} from "../../../core/services/annonce-service.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})

/**
 * Properties Component
 */
export class PropertiesComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  propertiesData!: properties[];
  annonces! : any[];

  public images: string[] = [
    'assets/img/real-estate/catalog/01.jpg',
    'assets/img/real-estate/catalog/02.jpg',
    'assets/img/real-estate/catalog/03.jpg',
    'assets/img/real-estate/catalog/04.jpg',
    'assets/img/real-estate/catalog/05.jpg',
    'assets/img/real-estate/catalog/06.jpg',
    'assets/img/real-estate/catalog/07.jpg',
    'assets/img/real-estate/catalog/08.jpg',
    'assets/img/real-estate/catalog/09.jpg',
    'assets/img/real-estate/catalog/10.jpg',
    'assets/img/real-estate/catalog/11.jpg',
    'assets/img/real-estate/catalog/12.jpg',
    'assets/img/real-estate/catalog/13.jpg',
    'assets/img/real-estate/catalog/14.jpg',
    'assets/img/real-estate/catalog/15.jpg',
    'assets/img/real-estate/catalog/16.jpg',
    'assets/img/real-estate/catalog/17.jpg',
    'assets/img/real-estate/catalog/18.jpg',
  ];
  idAnnonce:number
  constructor(private router:Router,public tokenStorage:TokenStorageService,private annonceService:AnnonceServiceService) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Accueil', link:'' },
      { label: 'Mon compte', link:'/account/info' },
      { label: 'Mes annonces', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();

    this.getMyAnnonces();
    this.images = this.getImage();
  }

   // Chat Data Fetch
   private _fetchData() {
    this.propertiesData = propertiesData;
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }

  getMyAnnonces(){
    this.annonceService.getAllAnnonces().subscribe(ans =>{
      this.annonces=ans
      console.log(ans)
    })
  }

  public getImage(){
    return this.images
  }

  deleteAnnonce(idAnnonce:number)
  {
    Swal.fire({
      title: 'Votre annonce va être supprimer définitivement\n\r',
      text: "Êtes vous sûr(e)s ? »",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText:'Retour'
    }).then((result) => {
      if (result.isConfirmed) {
        this.annonceService.deleteAnnonce(idAnnonce).subscribe((ans:any)=>{});
        Swal.fire(
          'Supprimée',
          "L'annonce ",
          'success'
        )
        this.router.navigate(['']);
      }
      if (result.isDismissed){
        this.router.navigate(['pages/account/properties']);
      }
    })
  }

  deconnexion(){
    this.tokenStorage.signOut()
  }

}
