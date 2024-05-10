import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

// Swiper Slider
import { SwiperOptions } from 'swiper';

import { topOffer, propertyCity, estateAagents, service, companies } from './home.model';
import { topOfferData, cityData, agentsData, servicesData, companiesData, servicesDataVisiteur} from './data';
import {AnnonceServiceService} from "../../core/services/annonce-service.service";
import {UtilisateurServiceService} from "../../core/services/utilisateur-service.service";
import {UntypedFormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {TokenStorageService} from "../../core/services/token-storage.service";

@Component({
  selector: 'app-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Index Component
 */
export class HomeComponent implements OnInit {

  topOfferData!: topOffer[];
  cityData!: propertyCity[];
  agentsData!: estateAagents[];
  servicesData!: service[];
  companiesData!: companies[];

  servicesDataVst!: service[];

  private formBuilder: any;

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
    'assets/img/real-estate/catalog/19.jpg',
    'assets/img/real-estate/catalog/20.jpg',
  ];

  constructor(private modalService: NgbModal,private annonceService:AnnonceServiceService,public tokenStorage:TokenStorageService) { }
  annonces! : any[];

  ngOnInit(): void {
     // Chat Data Get Function
     this._fetchData();
     this.filterredImages = this.list;

     // Rent Select data
     document.getElementById("rent-content")?.addEventListener("click",function(e) {
      const input = e.target as HTMLElement;
      const rent = document.querySelector('.rent') as HTMLElement;
      rent.innerText = input.innerText;
     });

     // Location Select data
     document.getElementById("location-content")?.addEventListener("click",function(e) {
      const input = e.target as HTMLElement;
      const location = document.querySelector('.location') as HTMLElement;
      location.innerText = input.innerText;
     });

     // Property Select data
     document.getElementById("property-content")?.addEventListener("click",function(e) {
      const input = e.target as HTMLElement;
      const property = document.querySelector('.property') as HTMLElement;
      property.innerText = input.innerText;
     });

    this.getAllAnnonces();
    this.images = this.getImage();
  }

  public shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public getImage(){
    return this.images
  }

   // Chat Data Fetch
   private _fetchData() {
    this.topOfferData = topOfferData;
    this.cityData = cityData;
    this.agentsData = agentsData;
    this.servicesData = servicesData;
    this.servicesDataVst = servicesDataVisiteur;
    this.companiesData = companiesData;
  }

  getAllAnnonces(){
    this.annonceService.getAllAnnonces().subscribe(ans =>{
      this.annonces=ans
      console.log(ans)
    })
  }

  onCalcul()
  {

    let timerInterval: any;
    Swal.fire({
      title: 'Prédiction',
      html: 'Veuillez patienter un moment ...',
      timer: 3200,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        // @ts-ignore
        const b = Swal.getIconContent().querySelector('b');
        timerInterval = setInterval(() => {
          if (b) {
            // @ts-ignore
            b.textContent = Swal.getTimerLeft().toString();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });


    var apType = (document.getElementById("ap-type")) as HTMLSelectElement;
    var indexApType = apType.selectedIndex;
    var optionApType = apType.options[indexApType];
    var typeAnnonce = (<HTMLSelectElement><unknown>optionApType).value;

    var adresse = (document.getElementById("property-district")) as HTMLSelectElement;
    var indexAdresse = adresse.selectedIndex;
    var optionAdresse = adresse.options[indexAdresse];
    var adresseAnnonce = (<HTMLSelectElement><unknown>optionAdresse).value;

    var surface = (document.getElementById("property-area") as HTMLInputElement).value;

    var nbRooms = null;
    try
    {if ((document.getElementById('rooms-1') as HTMLInputElement).checked) {
        nbRooms = 1;
      }
      if ((document.getElementById('rooms-2') as HTMLInputElement).checked) {
        nbRooms = 2;
      }
      if ((document.getElementById('rooms-3') as HTMLInputElement).checked) {
        nbRooms = 3;
      }
      if ((document.getElementById('rooms-4') as HTMLInputElement).checked) {
        nbRooms = 4;
      }
      if ((document.getElementById('rooms-5') as HTMLInputElement).checked) {
        nbRooms = 5;
      }
      if ((document.getElementById('rooms-6') as HTMLInputElement).checked) {
        nbRooms = 6;
      }
    } catch(e: any)
    {
    }
    var nbBathrooms = null;
    try
    {if ((document.getElementById('rooms1') as HTMLInputElement).checked) {
      nbBathrooms = 1;
    }
    if ((document.getElementById('rooms2') as HTMLInputElement).checked) {
      nbBathrooms = 2;
    }
    if ((document.getElementById('rooms3') as HTMLInputElement).checked) {
      nbBathrooms = 3;
    }
    if ((document.getElementById('rooms4') as HTMLInputElement).checked) {
      nbBathrooms = 4;
    }
    if ((document.getElementById('rooms5') as HTMLInputElement).checked) {
      nbBathrooms = 5;
    }
    if ((document.getElementById('rooms6') as HTMLInputElement).checked) {
      nbBathrooms = 6;
    }
    } catch(e: any)
    {
    }
    var autres = {
      "kitchen" : 0,
      "balcony" : 0,
      "terrasse" : 0,
      "jardin" : 0,
      "garage" : 0,
      "free-parking" : 0,
      "pool" : 0,
      "air-condition" : 0,
      "heating" : 0,
      "security-cameras" : 0,
    };
    for(let key in autres)
    {
      if ((document.getElementById(key) as HTMLInputElement).checked) {
        // @ts-ignore
        autres[key] = 1;
      }
    }
    var data =
      {
        "typeAnnonce": typeAnnonce,
        "adresse": adresseAnnonce,
        "surface": surface,
        "nbRooms": nbRooms,
        "nbBathrooms": nbBathrooms,
        "autres": autres
      }

    this.annonceService.calculatePrice("http://127.0.0.1:7000/predictPrice",data)
      .subscribe({
      next: (res) => {
        if(res["error"] == 0)
        {
          Swal.fire({
            title: 'Estimation du prix de votre '+typeAnnonce+' est\n'+res["prediction"]+" TND",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Aucune prediction ne peut etre faite!',
          })
        }
      },
      error: (e) => console.error(e)
    });
  }


  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: true,
    navigation: true,
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
   * Service Swiper setting
   */
   service = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 3,
      }
    }
  };

  /**
   * partners Swiper setting
   */
   partners = {
    initialSlide: 0,
    slidesPerView: 6,
    spaceBetween: 25
  };

  /**
   * agents Swiper setting
   */
   public agents: SwiperOptions  = {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  /**
   * Swiper setting
   */
   companies = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 25,
    pagination: true,
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
  * Slider range set
  */
   visibleSelection = 455;
   visibleBarOptions: Options = {
     floor: 0,
     ceil: 1000,
     showSelectionBar: true
   };

   /**
   * Portfolio Modern Data
   */
    filterredImages: { image: string; verified_btn?: string; btn: string; btn_color: string; sale: string; title: string; location: string; price: string; category: string;}[] | undefined;
    galleryFilter = 'Houses';
    list = [{
      image: 'assets/img/real-estate/recent/01.jpg',
      verified_btn: 'Verified',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For rental',
      title: 'Luxury Rental Villa',
      location: '118-11 Sutphin Blvd Jamaica, NY 11434',
      price: '$3,850',
      category: 'Houses'
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: '$200,410',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/03.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Country House',
      location: '6954 Grand AveMaspeth, NY 11378',
      price: '$162,000',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/01.jpg',
      verified_btn: 'Verified',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For rental',
      title: 'Luxury Rental Villa',
      location: '118-11 Sutphin Blvd Jamaica, NY 11434',
      price: '$3,850',
      category: 'Rooms'
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: '$200,410',
      category: 'Commercial',
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: '$200,410',
      category: 'Apartments',
    }
    ];



   /***
   * Active all category selected
   */
  activeCategory(category: string) {
    this.galleryFilter = category;
    if (this.galleryFilter === 'Houses') {
      this.filterredImages = this.list.filter(x => x.category === this.galleryFilter);
    } else {
      this.filterredImages = this.list.filter(x => x.category === this.galleryFilter);
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
