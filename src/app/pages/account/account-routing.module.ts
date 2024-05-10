import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Pages
import { InfoComponent } from './info/info.component';
import { PropertiesComponent } from './properties/properties.component';
import { SecurityComponent } from './security/security.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'security',
    component: SecurityComponent,
  },
  {
    path: 'properties',
    component: PropertiesComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
