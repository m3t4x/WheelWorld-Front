import { Component, OnInit } from '@angular/core';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

import { topOffer } from './sale.model';
import { topOfferData } from './data';
import {Annonce} from "../../../core/models/annonce.model";
import {AnnonceServiceService} from "../../../core/services/annonce-service.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})



/**
 * Sale Component
 */
export class SaleComponent implements OnInit {

  filterCriteria :any={
      typeVehicule: '',
      nbCylindre: 0,
      boiteVitesse: '',
      typeVvehicule: '',
      minPrice: 0,
      maxPrice: 10000000,
  }

  initFilterCriteria :any={
      typeVehicule: '',
      nbCylindre: 0,
      boiteVitesse: '',
      typeVvehicule: '',
      minPrice: 0,
      maxPrice: 10000000,
  }

  imagePath: string = '../../../assets/img/avatars/01.jpg';
 // bread crumb items
 breadCrumbItems!: Array<{}>;
 topOfferData!: Annonce[];
 longitude = 20.728218;
 latitude = 52.128973;
 dataCount:any;
 checkedVal: any[] = [];
  selectedRegion:any
  annonce:Annonce = new Annonce();

  obs:Observable<Annonce>;
  oldIndex = 0;
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

  constructor(private annonceService:AnnonceServiceService,private router:Router) {}
  annonces! : any[];


 ngOnInit(): void {
   /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
     { label: 'Accueil', link:'' },
     { label: 'Les annonces de vente', active: true }
   ];

   this.getAllSales();
   this.images = this.getImage();
 }

 // Data Fetch
 private _fetchData() {
   this.annonces = topOfferData;
   this.topOfferDatas = Object.assign([], this.topOfferData);
   this.dataCount = this.topOfferDatas.length;
 }

 getAllSales(filter?:any){
   this.filterCriteria={...this.filterCriteria,...filter}
   console.log(this.filterCriteria)
   this.annonceService.getVenteAnnonce(this.filterCriteria).subscribe(ans =>{
     this.annonces=ans
     console.log(this.annonces)
   })
 }

goToDetails(idAnnonce:any){
   this.router.navigate(['/catalog/single-v2/'+idAnnonce])
}

  // public shuffleArray(array: any[]): any[] {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

  public getImage(){
   return this.images
  }
  /**
  * Swiper setting
  */

  config = {
   initialSlide: 0,
   slidesPerView: 1,
   navigation: true
 };

 /**
   * Filter button clicked
   */
  FilterSidebar() {
    document.getElementById('filters-sidebar')?.classList.toggle('show');
    document.querySelector('.vertical-overlay')?.classList.toggle('show');
   }

   /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    document.getElementById('filters-sidebar')?.classList.remove('show');
    document.querySelector('.vertical-overlay')?.classList.remove('show');
  }

  // Map Model Open
  openMapModal(){
    document.querySelector('.map-popup')?.classList.remove('invisible');
  }

  // Map Model Open
  closeMapModel(){
    document.querySelector('.map-popup')?.classList.add('invisible');
  }


  topOfferDatas:any;
  // Location Filter
  LocationSearch(){
    var location = document.getElementById("location") as HTMLInputElement;
    this.topOfferDatas = this.topOfferData.filter( (data:any) => {
      return data.location === location.value;
    });
    this.dataCount = this.annonces.length;
  }

    // District Filter
    DistrictSearch(){
      var district = document.getElementById("district") as HTMLInputElement;
      this.topOfferDatas = this.topOfferData.filter( (data:any) => {
        return data.district === district.value;
      });
      this.dataCount = this.topOfferDatas.length;
    }



  /**
  * Range Slider Wise Data Filter
  */
  // Range Slider
  minValue: number = 90000;
  maxValue: number = 250000;
  options: Options = {
    floor: 30000,
    ceil: 500000,
    translate: (value: number): string => {
      return '$' + value;
    }
  };
  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minValue = value;
    } else {
      this.maxValue = value;
      this.topOfferDatas = this.topOfferData.filter( (data:any) => {
        data.price = data.price.replace(/,/g, '')
        return data.price >= this.minValue && data.price <= this.maxValue;
      });
    }
    this.dataCount = this.topOfferDatas.length;
  }

   // Square metres Filter
   minMeters:any | undefined;
   maxMeters:any | undefined;
   metresSearch() {
    this.minMeters = document.getElementById("minValue") as HTMLAreaElement;
    this.maxMeters = document.getElementById("maxValue") as HTMLAreaElement;
    this.topOfferDatas = this.topOfferData.filter( (data:any) => {
      return data.metres >= this.minMeters.value || data.metres <= this.maxMeters.value;
    });
    this.dataCount = this.topOfferDatas.length;
  }

 // Additional options Filter
 additionalOptions(e:any, type:any) {
  if (type === 'Featured') {
    //this.filterCriteria.typeAnnonce.push(type);
    this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.btn));
  }
  else{
    var index = this.checkedVal.indexOf(type);
    if (index > -1) {
      this.checkedVal.splice(index, 1);
    }
    this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.btn));
  }
  if (this.checkedVal.length == 0) {
    this.topOfferDatas = this.topOfferData
  }
  this.dataCount = this.topOfferDatas.length;

  if (type === 'Verified'){
    this.checkedVal.push(type);
    this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.verified_btn));
  }
  else {
    var index = this.checkedVal.indexOf(type);
    if (index > -1) {
      this.checkedVal.splice(index, 1);
    }
    this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.verified_btn));
  }
  if (this.checkedVal.length == 0) {
    this.topOfferDatas = this.topOfferData
  }
  this.dataCount = this.topOfferDatas.length;
}

  // Property  Filter
  AmenitiesFilter(e:any, type:any) {
    if (e.target.checked) {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.amenities));
    }
    else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.amenities));
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Property  Filter
  PentsFilter(e:any, type:any) {
    if (e.target.checked) {
      this.checkedVal.push(type);
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.pents));
    }
    else {
      var index = this.checkedVal.indexOf(type);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      this.topOfferDatas = this.topOfferData.filter((data: any) => this.checkedVal.includes(data.pents));
    }
    if (this.checkedVal.length == 0) {
      this.topOfferDatas = this.topOfferData
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("sortby") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }


}
