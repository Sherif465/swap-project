import { TestBed } from '@angular/core/testing';

import { FetchingPeopleService } from './fetching-people.service';

describe('FetchingPeopleService', () => {
  let service: FetchingPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchingPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
