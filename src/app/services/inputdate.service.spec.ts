import { TestBed } from '@angular/core/testing';

import { InputdateService } from './inputdate.service';

describe('InputdateService', () => {
  let service: InputdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
