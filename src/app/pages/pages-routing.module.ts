import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: 'advertisement', loadChildren: () => import('./advertisement/advertisement.module').then(m => m.AdvertisementModule)
  }, 
  {
    path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule)
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
