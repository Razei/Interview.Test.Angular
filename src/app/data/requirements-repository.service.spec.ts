import { TestBed } from '@angular/core/testing';

import { RequirementsRepository } from './requirements-repository.service';

describe('RequirementsRepositoryService', () => {
  let service: RequirementsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
