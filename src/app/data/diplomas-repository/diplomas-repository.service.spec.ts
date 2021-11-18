import { TestBed } from '@angular/core/testing';
import { DiplomasRepositoryService } from './diplomas-repository.service';

describe('DiplomasRepositoryService', () => {
  let service: DiplomasRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomasRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
