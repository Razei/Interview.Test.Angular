import { Pipe, PipeTransform } from '@angular/core';
import { RequirementsRepositoryService } from '../data/requirements-repository/requirements-repository.service';
import { Diploma } from '../models/diploma.interface';
import { STANDING } from '../models/standing.enum';
import { Student } from '../models/student.model';

@Pipe({
  name: 'hasGraduated'
})
export class HasGraduatedPipe implements PipeTransform {
  constructor(
    private requirementsRepository: RequirementsRepositoryService,
  ) {}

  transform(student: Student, diploma: Diploma): [boolean, number] {
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
