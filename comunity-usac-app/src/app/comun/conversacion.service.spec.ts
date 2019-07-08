import { TestBed } from '@angular/core/testing';

import { ConversacionService } from './conversacion.service';

describe('ConversacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversacionService = TestBed.get(ConversacionService);
    expect(service).toBeTruthy();
  });
});
