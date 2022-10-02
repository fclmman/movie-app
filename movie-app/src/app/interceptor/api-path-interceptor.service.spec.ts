import { TestBed } from '@angular/core/testing';

import { ApiPathInterceptorService } from './api-path-interceptor.service';

describe('ApiPathInterceptorService', () => {
  let service: ApiPathInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPathInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
