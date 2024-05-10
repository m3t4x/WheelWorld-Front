import { Component, OnInit } from '@angular/core';
// Range Slider
import { Options } from '@angular-slider/ngx-slider';

import { topOffer } from './rent.model';
import { topOfferData } from './data';
import {AnnonceServiceService} from "../../../core/services/annonce-service.service";
import {Annonce} from "../../../core/models/annonce.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})

/**
 * Rent Component
 */
export class RentComponent implements OnInit {

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

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  topOfferData!: topOffer[];
  longitude = 20.728218;
  latitude = 52.128973;
  dataCount:any;

  checkedVal: any[] = [];

  oldIndex = 0;
  public images: string[] = [
    'assets/img/real-estate/catalog/02.jpg',
    'assets/img/real-estate/catalog/05.jpg',
    'assets/img/real-estate/catalog/01.jpg',
    'assets/img/real-estate/catalog/04.jpg',
    'assets/img/real-estate/catalog/03.jpg',
    'assets/img/real-estate/catalog/06.jpg',
    'assets/img/real-estate/catalog/07.jpg',
    'assets/img/real-estate/catalog/09.jpg',
    'assets/img/real-estate/catalog/08.jpg',
    'assets/img/real-estate/catalog/12.jpg',
    'assets/img/real-estate/catalog/10.jpg',
    'assets/img/real-estate/catalog/13.jpg',
    'assets/img/real-estate/catalog/11.jpg',
    'assets/img/real-estate/catalog/14.jpg',
    'assets/img/real-estate/catalog/17.jpg',
    'assets/img/real-estate/catalog/15.jpg',
    'assets/img/real-estate/catalog/18.jpg',
    'assets/img/real-estate/catalog/16.jpg',
    'assets/img/real-estate/catalog/20.jpg',
    'assets/img/real-estate/catalog/19.jpg',
  ];

  constructor(private annonceService:AnnonceServiceService,private router:Router) { }

  annonce:Annonce = new Annonce();
  annonces! : any[];
  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Accueil', link:'' },
      { label: 'Les annonces de location', active: true }
    ];

    // Data Get Function
    //this._fetchData();
    this.getAllRents() ;
    this.images = this.getImage();
  }

  // Data Fetch
  private _fetchData() {
    this.dataCount = topOfferData.length;
    this.topOfferData = topOfferData;
    this.topOfferDatas = Object.assign([], this.topOfferData);
  }

  getAllRents(filter?:any){
    this.filterCriteria={...this.filterCriteria,...filter}
    this.annonceService.getLocationAnnonce(this.filterCriteria).subscribe(ans =>{
      this.annonces=ans
      console.log(this.annonces)
    })
  }

  goToDetails(idAnnonce:any){
    this.router.navigate(['/catalog/single-v2/'+idAnnonce])
  }


  public getImage(){
    return this.images
  }


  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    loop: true
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
    this.dataCount = this.topOfferDatas.length;
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
  minValue: number = 1100;
  maxValue: number = 3000;
  options: Options = {
    floor: 0,
    ceil: 5000,
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

  // Bed-Rooms  Filter
  bedrooms(value:any) {
    if(value > 3){
      this.topOfferDatas = this.topOfferData.filter((data:any) => {
        return data.bad >= value;
      });
    }
    else{
      this.topOfferDatas = this.topOfferData.filter((data:any) => {
        return data.bad === value;
      });
    }
    this.dataCount = this.topOfferDatas.length;
  }

  // Bed-Rooms  Filter
  bathrooms(value:any) {
    this.topOfferDatas = this.topOfferData.filter((data:any) => {
      return data.bath === value;
    });
    this.dataCount = this.topOfferDatas.length;
  }

   // Square metres Filter
   minMeters:any | undefined;
   maxMeters:any | undefined;
   metresSearch() {
    this.minMeters = document.getElementById("minValue") as HTMLAreaElement;
    this.maxMeters = document.getElementById("maxValue") as HTMLAreaElement;
    this.topOfferDatas = this.topOfferData.filter( (data:any) => {
      return data.metres >= this.minMeters.value && data.metres <= this.maxMeters.value;
    });
    this.dataCount = this.topOfferDatas.length;
  }

  // Additional options Filter
  additionalOptions(e:any, type:any) {
    if (type === 'Featured') {
      this.checkedVal.push(type);
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
