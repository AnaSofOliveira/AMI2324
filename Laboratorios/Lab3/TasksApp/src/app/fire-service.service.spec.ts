import { TestBed } from '@angular/core/testing';
import { FireserviceService } from './fire-service.service';


describe('FileServiceService', () => {
  let service: FireserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
