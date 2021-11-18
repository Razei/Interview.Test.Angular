import { TestBed } from '@angular/core/testing';
import { RequirementsRepositoryService } from './requirements-repository.service';

describe('RequirementsRepositoryService', () => {
  let service: RequirementsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
