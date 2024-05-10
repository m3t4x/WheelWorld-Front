import { Component, OnInit } from '@angular/core';

import { promotion } from './advertisement-promotion.model';
import { promotionData } from './data';

@Component({
  selector: 'app-advertisement-promotion',
  templateUrl: './advertisement-promotion.component.html',
  styleUrls: ['./advertisement-promotion.component.scss']
})

/**
 * Advertisement Promotion Component
 */
export class AdvertisementPromotionComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  promotionData!: promotion[];

  constructor() { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Add advertisement ', link:'/advertisement/add-advertisement' },
      { label: 'Promotion page', active: true }
    ];

     // Chat Data Get Function
    this._fetchData();
    this.result = 35
  }

  // Chat Data Fetch
  private _fetchData() {
    this.promotionData = promotionData;
  }

  result:any = 0;
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkboxes:any = document.getElementsByName('checkAll');
    this.result = 0
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        this.result += parseInt(checkboxes[i].value);
      }
    }
  }

}
