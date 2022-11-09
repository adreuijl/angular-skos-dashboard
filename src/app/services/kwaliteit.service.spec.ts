import { TestBed } from '@angular/core/testing';

import { KwaliteitService } from './kwaliteit.service';

describe('KwaliteitService', () => {
  let service: KwaliteitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwaliteitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
