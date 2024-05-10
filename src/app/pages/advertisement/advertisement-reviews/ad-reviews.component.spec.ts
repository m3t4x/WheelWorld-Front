import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementReview } from './ad-reviews.component';

describe('AdvertisementReviewComponent', () => {
  let component: AdvertisementReviewComponent;
  let fixture: ComponentFixture<AdvertisementReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
