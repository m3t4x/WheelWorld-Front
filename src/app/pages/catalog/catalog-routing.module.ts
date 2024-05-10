import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Pages
import { RentComponent } from './rent/rent.component';
import { SaleComponent } from './sale/sale.component';
import { SingleV2Component } from './single-v2/single-v2.component';

const routes: Routes = [
  {
    path: 'rent',
    component: RentComponent,
  },
  {
    path: 'sale',
    component: SaleComponent,
  },
  {
    path: 'single-v2/:id',
    component: SingleV2Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
