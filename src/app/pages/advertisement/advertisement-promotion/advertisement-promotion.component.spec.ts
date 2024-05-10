import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementPromotionComponent } from './advertisement-promotion.component';

describe('AdvertisementPromotionComponent', () => {
  let component: AdvertisementPromotionComponent;
  let fixture: ComponentFixture<AdvertisementPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
