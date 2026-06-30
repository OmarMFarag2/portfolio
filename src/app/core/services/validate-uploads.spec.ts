import { TestBed } from '@angular/core/testing';

import { ValidateUploads } from './validate-uploads';

describe('ValidateUploads', () => {
  let service: ValidateUploads;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUploads);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
