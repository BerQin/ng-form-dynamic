import { TestBed } from '@angular/core/testing';

import { FormGlobalService } from './form-global.service';

describe('FormGlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormGlobalService = TestBed.get(FormGlobalService);
    expect(service).toBeTruthy();
  });
});
