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

  transform(student: Student, diploma: Diploma): [boolean, number, number] {
    let { average, credits } = this.hasGraduated(diploma, student);

    if (average < 50)
      return [false, STANDING.Remedial, credits];
    else if (average < 80)
      return [true, STANDING.Average, credits];
    else if (average < 95)
      return [true, STANDING.MagnaCumLaude, credits];
    else
      return [true, STANDING.SumaCumLaude, credits];
  }

  /**
   * Get the average mark and credits for each student.
   * @param diploma Current diploma.
   * @param student Current student.
   */
  private hasGraduated(diploma: Diploma, student: Student): { average: number, credits: number } {
    let result = { average: 0, credits: 0};

    // loop over every requirement ID
    diploma.Requirements.forEach(requirementId => {
      const requirement = this.requirementsRepository.getRequirement(requirementId);

      // check if the student has this course and add mark to average
      requirement?.Courses.forEach(courseId => {
        const course = student.Courses.find(course => course.Id == courseId);

        if (course) {
          result.average += course.Mark;

          if (course.Mark > requirement.MinimumMark)
          {
            result.credits += requirement.Credits;
          }
        }
      });
    });

    // prevent divide by 0 causing NaN
    if (result.average !== 0 && student.Courses.length !== 0){
      result.average = result.average / student.Courses.length;
    }

    return result;
  }
}
