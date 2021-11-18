import { Diploma } from '../models/diploma.interface';
import { Requirement } from '../models/requirement.interface';

export class Repository {
  GetDiploma(id: number): Diploma | null
  {
      var diplomas = this.GetDiplomas();
      var diploma: Diploma | null = null;

      for (let i = 0; i < diplomas.length; i++)
      {
          if (id == diplomas[i].Id)
          {
              diploma = diplomas[i];
          }
      }
      return diploma;

  }

  GetRequirement(id: number): Requirement | null
  {
      var requirements = this.GetRequirements();
      var requirement: Requirement | null = null;

      for (let i = 0; i < requirements.length; i++)
      {
          if (id == requirements[i].Id)
          {
              requirement = requirements[i];
          }
      }
      return requirement;
  }


  private GetDiplomas(): Diploma[]
  {
      return [
        {
          Id: 1,
          Credits: 4,
          Requirements: [100,102,103,104]
        }
      ];
  }

  GetRequirements(): Requirement[]
  {
    return [
      { Id: 100, Name: "Math", MinimumMark: 50, Courses: [1], Credits: 1 },
      { Id: 102, Name: "Science", MinimumMark: 50, Courses: [2], Credits: 1 },
      { Id: 103, Name: "Literature", MinimumMark :50, Courses: [3], Credits: 1},
      { Id: 104, Name: "Physical Education", MinimumMark: 50, Courses: [4], Credits: 1 }
    ];
  }
}
