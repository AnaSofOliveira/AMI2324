import { TestBed } from '@angular/core/testing';

import { FireauthServiceService } from './fireauth-service.service';

describe('FireauthServiceService', () => {
  let service: FireauthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireauthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
