import { TestBed } from '@angular/core/testing';

import { AccesoComunService } from './acceso-comun.service';

describe('AccesoComunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesoComunService = TestBed.get(AccesoComunService);
    expect(service).toBeTruthy();
  });
});
