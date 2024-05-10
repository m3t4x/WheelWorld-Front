import { CommonModule } from '@angular/common';
import {forwardRef, NgModule} from '@angular/core';

// Page Routing
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

// Light Box
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { HomeComponent } from './home/home.component';

import { NgbDropdownModule, NgbNavModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    LightboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgxSliderModule,
    NgxUsefulSwiperModule,
  ],

})
export class PagesModule {}
