import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbPaginationModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Youtube Player
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Google Map
import { AgmCoreModule } from '@agm/core';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Component
import { SharedModule } from '../../shared/shared.module';
import { SortByPipe } from '../catalog/sort-by.pipe';
import { CatalogRoutingModule } from './catalog-routing.module';
import { RentComponent } from './rent/rent.component';
import { SaleComponent } from './sale/sale.component';
import { SingleV2Component } from './single-v2/single-v2.component';

@NgModule({
  declarations: [RentComponent, SingleV2Component, SaleComponent, SortByPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgxYoutubePlayerModule,
    NgxSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    }),
    CatalogRoutingModule,
    SharedModule,
    NgxUsefulSwiperModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
  ],
})
export class CatalogModule {}
