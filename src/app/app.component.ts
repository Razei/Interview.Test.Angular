import { Component } from '@angular/core';

import { Diploma } from './models/diploma.interface';
import { DiplomasRepositoryService } from './data/diplomas-repository/diplomas-repository.service';
import { STANDING } from './models/standing.enum';
import { Student } from './models/student.model';
import { RequirementsRepositoryService } from './data/requirements-repository/requirements-repository.service';
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
    private requirementsRepository: RequirementsRepositoryService,
    private diplomaRepository: DiplomasRepositoryService
  ) {
    this.diploma = this.diplomaRepository.getDiploma(1) || { Id: 0, Credits: 0, Requirements: [] } as Diploma;
    this.students = this.studentRepository.students;
  }

  hasGraduated(diploma: Diploma, student: Student): [boolean, number] {
    let average = this.getAverage(diploma, student);

    average = average / student.Courses.length;

    if (average < 50)
      return [false, STANDING.Remedial];
    else if (average < 80)
      return [true, STANDING.Average];
    else if (average < 95)
      return [true, STANDING.MagnaCumLaude];
    else
      return [true, STANDING.SumaCumLaude];
  }

  // this could probably be a helper function or service if it is meant to be used in multiple places
  /**
   * Get the average for each course if the course is part of the diploma requirements.
   * @param diploma Current diploma
   * @param student Current student
   * @return the average as a number.
   */
  private getAverage(diploma: Diploma, student: Student): number {
    let average = 0;

    // loop over every requirement ID
    diploma.Requirements.forEach(requirementId => {
      const requirement = this.requirementsRepository.getRequirement(requirementId);

      // check if the student has this course and add mark to average
      requirement?.Courses.forEach(courseId => {
        const course = student.Courses.find(course => course.Id == courseId);

        if (course) {
          average += course.Mark;
        }
      });
    });

    return average;
  }
}
