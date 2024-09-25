import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampgroundComponent } from './edit-campground.component';

describe('EditCampgroundComponent', () => {
  let component: EditCampgroundComponent;
  let fixture: ComponentFixture<EditCampgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCampgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCampgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
