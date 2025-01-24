import { TestBed } from '@angular/core/testing';

import { SportelloService } from './sportello.service';

describe('SportelloService', () => {
  let service: SportelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
