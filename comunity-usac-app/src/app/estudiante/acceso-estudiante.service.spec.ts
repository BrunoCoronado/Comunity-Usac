import { TestBed } from '@angular/core/testing';

import { AccesoEstudianteService } from './acceso-estudiante.service';

describe('AccesoEstudianteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesoEstudianteService = TestBed.get(AccesoEstudianteService);
    expect(service).toBeTruthy();
  });
});
