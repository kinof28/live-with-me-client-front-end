import { TestBed } from '@angular/core/testing';

import { LocalisationServiceService } from './localisation-service.service';

describe('LocalisationServiceService', () => {
  let service: LocalisationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalisationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
