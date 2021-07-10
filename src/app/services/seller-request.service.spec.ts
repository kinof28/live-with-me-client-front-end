import { TestBed } from '@angular/core/testing';

import { SellerRequestService } from './seller-request.service';

describe('SellerRequestService', () => {
  let service: SellerRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
