import { TestBed } from '@angular/core/testing';

import { DefaultFormErrorsService } from './default-form-errors.service';

describe('DefaultFormErrorsService', () => {
  let service: DefaultFormErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultFormErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
