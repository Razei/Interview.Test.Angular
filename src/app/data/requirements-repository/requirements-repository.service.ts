import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Requirement } from '../../models/requirement.interface';

@Injectable({
  providedIn: 'root'
})
export class RequirementsRepositoryService {
  _requirements: Requirement[];

  constructor() {
    this._requirements = [
      { Id: 100, Name: "Math", MinimumMark: 50, Courses: [1], Credits: 1 },
      { Id: 102, Name: "Science", MinimumMark: 50, Courses: [2], Credits: 1 },
      { Id: 103, Name: "Literature", MinimumMark :50, Courses: [3], Credits: 1},
      { Id: 104, Name: "Physical Education", MinimumMark: 50, Courses: [4], Credits: 1 }
    ];
  }

  get requirements(): Requirement[] {
    return cloneDeep(this._requirements);
  }

  getRequirement(id: number): Requirement | undefined {
    return this.requirements.find(requirement => requirement.Id === id);
  }
}
