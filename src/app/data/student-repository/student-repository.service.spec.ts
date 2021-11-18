/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentRepositoryService } from './student-repository.service';

describe('Service: StudentRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentRepositoryService]
    });
  });

  it('should ...', inject([StudentRepositoryService], (service: StudentRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
