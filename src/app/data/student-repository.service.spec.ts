/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentRepository } from './student-repository.service';

describe('Service: StudentRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentRepository]
    });
  });

  it('should ...', inject([StudentRepository], (service: StudentRepository) => {
    expect(service).toBeTruthy();
  }));
});
