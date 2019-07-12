import { TestBed } from '@angular/core/testing';

import { FormGroupItemService } from './form-group-item.service';

describe('FormGroupItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormGroupItemService = TestBed.get(FormGroupItemService);
    expect(service).toBeTruthy();
  });
});
