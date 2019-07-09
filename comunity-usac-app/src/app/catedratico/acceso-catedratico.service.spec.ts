import { TestBed } from '@angular/core/testing';

import { AccesoCatedraticoService } from './acceso-catedratico.service';

describe('AccesoCatedraticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesoCatedraticoService = TestBed.get(AccesoCatedraticoService);
    expect(service).toBeTruthy();
  });
});
