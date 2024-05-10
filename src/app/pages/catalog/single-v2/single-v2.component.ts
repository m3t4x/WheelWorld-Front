import {Component, OnInit, ViewChild} from '@angular/core';
import { SwiperComponent } from 'ngx-useful-swiper';

import { apartments, recently } from './single-v2.model';
import { apartmentsData, recentlyData } from './data';

import { SwiperOptions } from 'swiper';
import {AnnonceServiceService} from "../../../core/services/annonce-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Annonce} from "../../../core/models/annonce.model";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-single-v2',
  templateUrl: './single-v2.component.html',
  styleUrls: ['./single-v2.component.scss']
})

/**
 * SingleV2 Component
 */
export class SingleV2Component implements OnInit{

  // bread crumb items
   breadCrumbItems!: Array<{}>;
  apartmentsData!: apartments[];
  recentlyData!: recently[];
  public firstColleaps = true;



 @ViewChild('usefulSwiper', { static: false }) usefulSwiper?: SwiperComponent;
  appartInfo$ : Observable<any>
  maisonInfo$ : Observable<any>
  localInfo$ : Observable<any>
  terrainInfo$ : Observable<any>
  immeubleInfo$ : Observable<any>
  fermeInfo$ : Observable<any>
  idAnnonce:number
  annonce:Annonce
  type_Annonce:string;
  etaage :any
  constructor(private annonceService:AnnonceServiceService,private route:ActivatedRoute,private router:Router,public tokenStorage:TokenStorageService) { }

   annonces! : any;
  appartements! : any;
  maisons! : any;

  locals! : any;

  isMaisonFlag: boolean;
  isAppartementFlag: boolean;
  ngOnInit(): void {

    this.idAnnonce = this.route.snapshot.params['id'];
    this.annonce = new Annonce();
    this.annonceService.getAnnonceById(this.idAnnonce).subscribe(data => {
      this.annonce=data;
      console.log(data)
    });

    // this.annonceService.getAnnonceById(1).pipe(tap(data=>{
    //
    // }))


    this.idAnnonce = this.route.snapshot.params['id'];
    this.annonces = null;

    this.annonceService.getAnnonceById(this.idAnnonce).subscribe(data => {
      console.log(data)
    });


    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Accueil', link: '' },
      { label: 'Annonce'},
      // { label: this.annonce.titre, active: true }
    ];
    // Data Get Function
    //this._fetchData();
  }


  updateAnnonce(id:number)
  {
    this.router.navigate(['',id]);
  }

  deleteAnnonce()
  {
    Swal.fire({
      title: 'Cette annonce va être supprimer définitivement\n\r'
        .concat('Titre : '.concat(this.annonce.titre)),
      text: "Êtes vous sûr(e)s ? »",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText:'Retour'
    }).then((result) => {
      if (result.isConfirmed) {
        this.annonceService.deleteAnnonce(this.idAnnonce).subscribe((ans:any)=>{});
        Swal.fire(
          'Supprimée',
          "L'annonce ",
          'success'
        )
        this.router.navigate(['']);
      }
      if (result.isDismissed){
        this.router.navigate(['catalog/single-v2']);
      }
    })
  }

  modifierAnnonce(idAnnonce:number,typeAnnoce:string){
    this.router.navigate(['modifierAnnonce/'+typeAnnoce + '/' +idAnnonce]);
  }


  // Data Fetch
  // private _fetchData() {
  //   this.apartmentsData = apartmentsData;
  //   this.recentlyData = recentlyData;
  // }

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    navigation: true
  };

  /**
   * Swiper setting
   */
  recently = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: true,
    navigation: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 4,
      }
    }
  };


  // Youtube Player
  // onStateChange(event: any) {
  //   this.ytEvent = event.data;
  // }
  // savePlayer(player: any) {
  //   this.player = player;
  // }
  // playVideo() {
  //   this.player.playVideo();
  // }
  // pauseVideo() {
  //   this.player.pauseVideo();
  // }

  Imageslider: SwiperOptions = {
    spaceBetween: 10,
    direction: 'horizontal',
    slidesPerView: 5
  }

  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
    swiper.forEach((el: any) => {
      el.classList.remove('tns-nav-active')
    })
    event.target.closest('.swiperlist').classList.add('tns-nav-active')
    this.usefulSwiper!.swiper.slideTo(id)
  }

}
