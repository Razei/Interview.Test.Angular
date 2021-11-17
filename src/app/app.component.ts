import { Component } from '@angular/core';

import { Diploma } from './Diploma';
import { Repository } from './repository';
import { STANDING } from './STANDING';
import { Student } from './Student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private repository: Repository;

  title = 'Graduation Tracker';

  diploma: Diploma;
  students: Student[];

  constructor() {
    this.repository = new Repository();

    this.diploma = this.repository.GetDiploma(1) || { Id: 0, Credits: 0, Requirements: [] };
    this.students = this.repository.GetStudents();
  }

  hasGraduated(diploma: Diploma, student: Student): [boolean, number] {
    let average = this.getAverage(diploma, student);

    average = average / student.Courses.length;

    var standing = STANDING.None;

    if (average < 50)
        standing = STANDING.Remedial;
    else if (average < 80)
        standing = STANDING.Average;
    else if (average < 95)
        standing = STANDING.MagnaCumLaude;
    else
        standing = STANDING.SumaCumLaude;

    switch (standing)
    {
        case STANDING.Remedial:
            return [false, standing];
        case STANDING.Average:
            return [true, standing];
        case STANDING.SumaCumLaude:
            return [true, standing];
        case STANDING.MagnaCumLaude:
            return [true, standing];

        default:
            return [false, standing];
    }
  }

  /**
   * Get the average for each course if the course is part of the diploma requirements.
   * @param diploma Current diploma
   * @param student Current student
   * @return the average as a number.
   */
  getAverage(diploma: Diploma, student: Student): number {
    let average = 0;

    // loop over every requirement ID
    diploma.Requirements.forEach(requirementId => {
      const requirement = this.repository.GetRequirement(requirementId);

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
