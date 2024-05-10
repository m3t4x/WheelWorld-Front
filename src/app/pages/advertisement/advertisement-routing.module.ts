import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AddAdvertisementComponent } from "./add-advertisement/add-advertisement.component";
import { AdvertisementPromotionComponent } from "./advertisement-promotion/advertisement-promotion.component";
 import { AdvertisementComponent } from "./advertisment/advertisement.component";
// import { ReviewsComponent } from "./reviews/reviews.component";

const routes: Routes = [
  {
    path: "add-advertisement",
    component: AddAdvertisementComponent
  },
  {
    path: "advertisement-promotion",
    component: AdvertisementPromotionComponent
  },
  {
    path: "advertisements",
    component: AdvertisementComponent
  },
  // {
  //   path: "reviews",
  //   component: ReviewsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorRoutingModule { }
