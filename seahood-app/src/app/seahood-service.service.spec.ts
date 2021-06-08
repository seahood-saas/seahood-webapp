import { TestBed } from '@angular/core/testing';

import { SeahoodServiceService } from './seahood-service.service';

describe('SeahoodServiceService', () => {
  let service: SeahoodServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeahoodServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
