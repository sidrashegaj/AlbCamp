import { TestBed } from '@angular/core/testing';

import { CampgroundService } from './campground.service';

describe('CampgroundService', () => {
  let service: CampgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
