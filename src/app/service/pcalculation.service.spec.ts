import { TestBed } from '@angular/core/testing';

import { PcalculationService } from './pcalculation.service';

describe('PcalculationService', () => {
  let service: PcalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
