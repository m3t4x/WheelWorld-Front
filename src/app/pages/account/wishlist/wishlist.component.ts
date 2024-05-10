import { Component, OnInit } from '@angular/core';

import { wishlist } from './wishlist.model';
import { wishlistData } from './data';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})

/**
 * Wishlist Component
 */
export class WishlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  wishlistData!: wishlist[];

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Accueil', link:'' },
      { label: 'Compte', link:'/account/info' },
      { label: 'Annonces aimées', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.wishlistData = wishlistData;
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }


}
