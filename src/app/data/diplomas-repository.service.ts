import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Diploma } from '../models/diploma.interface';

@Injectable({
  providedIn: 'root'
})
export class DiplomasRepository {
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

  get diplomas(){
    return cloneDeep(this._diplomas);
  }

  getDiploma(id: number): Diploma | null {
    const diplomas = this.diplomas;
    let diploma: Diploma | null = null;

    for (let i = 0; i < diplomas.length; i++)
    {
      if (id == diplomas[i].Id)
      {
          diploma = diplomas[i];
      }
    }

    return diploma;
  }
}
