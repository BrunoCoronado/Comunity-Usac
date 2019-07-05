import { TestBed } from '@angular/core/testing';

import { AccesoAdministradorService } from './acceso-administrador.service';

describe('AccesoAdministradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesoAdministradorService = TestBed.get(AccesoAdministradorService);
    expect(service).toBeTruthy();
  });
});
