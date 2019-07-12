import { TestBed } from '@angular/core/testing';

import { FormGroupsService } from './form-groups.service';

describe('FormGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormGroupsService = TestBed.get(FormGroupsService);
    expect(service).toBeTruthy();
  });
});
