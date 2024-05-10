import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbCarouselModule, NgbProgressbarModule, NgbRatingModule, NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Google Map
import { AgmCoreModule } from '@agm/core';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Component
import { VendorRoutingModule } from "./advertisement-routing.module";
import { SharedModule } from "../../shared/shared.module";


//import { SortByVendorPipe } from '../vendor/sort-by.pipe';
import { AddAdvertisementComponent } from './add-advertisement/add-advertisement.component';
import { AdvertisementPromotionComponent } from './advertisement-promotion/advertisement-promotion.component';
import { AdvertisementComponent } from './advertisment/advertisement.component';
import { AdvertisementReview } from './advertisement-reviews/ad-reviews.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    AddAdvertisementComponent,
    AdvertisementPromotionComponent,
    AdvertisementComponent,
    AdvertisementReview,
   // SortByVendorPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbCarouselModule,
    VendorRoutingModule,
    NgbProgressbarModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
    DropzoneModule,
    NgxUsefulSwiperModule
  ]
})
export class AdvertisementModule { }
