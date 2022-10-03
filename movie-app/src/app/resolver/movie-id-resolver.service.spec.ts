import { TestBed } from '@angular/core/testing';

import { MovieIdResolverService } from './movie-id-resolver.service';

describe('MovieIdResolverService', () => {
  let service: MovieIdResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieIdResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
