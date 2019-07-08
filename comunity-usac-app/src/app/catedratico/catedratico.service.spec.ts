import { TestBed } from '@angular/core/testing';

import { CatedraticoService } from './catedratico.service';

describe('CatedraticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatedraticoService = TestBed.get(CatedraticoService);
    expect(service).toBeTruthy();
  });
});
