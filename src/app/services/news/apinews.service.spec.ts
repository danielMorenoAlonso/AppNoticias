import { TestBed } from '@angular/core/testing';

import { ApinewsService } from './apinews.service';

describe('ApinewsService', () => {
  let service: ApinewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApinewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
