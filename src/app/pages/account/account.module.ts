import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbRatingModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

// Drop Zone
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

// Component
import { SharedModule } from '../../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { InfoComponent } from './info/info.component';
import { PropertiesComponent } from './properties/properties.component';
import { SecurityComponent } from './security/security.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { SortByAccountPipe } from '../account/sort-by.pipe';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
};

@NgModule({
  declarations: [InfoComponent, SecurityComponent, PropertiesComponent, WishlistComponent, SortByAccountPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SharedModule,
    AccountRoutingModule,
    DropzoneModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class AccountModule {}
