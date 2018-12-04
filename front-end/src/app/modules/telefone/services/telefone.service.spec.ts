import { TestBed } from '@angular/core/testing';

import { TelefoneService } from './telefone.service';

describe('TelefoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelefoneService = TestBed.get(TelefoneService);
    expect(service).toBeTruthy();
  });
});
