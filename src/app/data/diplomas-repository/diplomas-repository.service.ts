import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Diploma } from '../../models/diploma.interface';

@Injectable({
  providedIn: 'root'
})
export class DiplomasRepositoryService {
  _diplomas: Diploma[];

  constructor() {
    this._diplomas = [
      {
        Id: 1,
        Credits: 4,
        Requirements: [100,102,103,104]
      }
    ];
  }

  get diplomas(): Diploma[] {
    return cloneDeep(this._diplomas);
  }

  getDiploma(id: number): Diploma | undefined {
    return this.diplomas.find(diploma => diploma.Id === id);
  }
}
