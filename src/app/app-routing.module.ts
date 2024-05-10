import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {SingleV2Component} from "./pages/catalog/single-v2/single-v2.component";
import {AboutComponent} from "./pages/extrapages/about/about.component";
import {PaymentComponent} from "./pages/vendor/payment/payment.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule)  },
  // { path: 'catalog/single-v2/:id', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'catalog/single-v2/:id', component: SingleV2Component },
  {path:'payment',component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
