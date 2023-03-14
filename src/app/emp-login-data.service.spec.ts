import { TestBed } from '@angular/core/testing';

import { EmpLoginDataService } from './emp-login-data.service';

describe('EmpLoginDataService', () => {
  let service: EmpLoginDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpLoginDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
