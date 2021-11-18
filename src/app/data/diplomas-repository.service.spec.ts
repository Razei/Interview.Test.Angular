import { TestBed } from '@angular/core/testing';
import { DiplomasRepository } from './diplomas-repository.service';


describe('DiplomasRepositoryService', () => {
  let service: DiplomasRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomasRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
