import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss']
})

/**
 * AddAdvertisement Component
 */
export class AddAdvertisementComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  longitude = 20.728218;
  latitude = 52.128973;
  public overviewColleaps = true;
  public amenitiesColleaps = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Add Advertisement', active: true }
    ];
  }

  inView(ele:any){
    ele.scrollIntoView({behavior:"smooth", block:"start", inline:"start"})
  }

  /**
   * Open Review modal
   * @param reviewContent modal content
   */
   openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { size: 'fullscreen', windowClass: 'modal-holder' });
  }

}
