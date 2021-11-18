import { Component } from '@angular/core';

import { Diploma } from './models/diploma.interface';
import { DiplomasRepositoryService } from './data/diplomas-repository/diplomas-repository.service';
import { Student } from './models/student.model';
import { StudentRepositoryService } from './data/student-repository/student-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Graduation Tracker';

  diploma: Diploma;
  students: Student[];

  constructor(
    private studentRepository: StudentRepositoryService,
    private diplomaRepository: DiplomasRepositoryService
  ) {
    this.diploma = this.diplomaRepository.getDiploma(1) || { Id: 0, Credits: 0, Requirements: [] } as Diploma;
    this.students = this.studentRepository.students;
  }
}
