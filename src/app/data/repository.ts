import { Diploma } from '../models/diploma.interface';

export class Repository {
  GetDiploma(id: number): Diploma | null {
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
}
