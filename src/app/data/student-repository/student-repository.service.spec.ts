import { inject, TestBed } from '@angular/core/testing';
import { StudentRepositoryService } from './student-repository.service';

describe('Service: StudentRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentRepositoryService]
    });
  });

  it('should be created', inject([StudentRepositoryService], (service: StudentRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
