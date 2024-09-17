import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundDetailComponent } from './campground-detail.component';

describe('CampgroundDetailComponent', () => {
  let component: CampgroundDetailComponent;
  let fixture: ComponentFixture<CampgroundDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampgroundDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampgroundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
