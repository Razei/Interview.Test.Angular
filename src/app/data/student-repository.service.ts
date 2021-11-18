import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentRepository {
  _students: Student[];

  constructor() {
    this._students = [
      new Student(1, [
        { Id: 1, Name: "Math", Mark: 95 },
        { Id: 2, Name: "Science", Mark: 95 },
        { Id: 3, Name: "Literature", Mark: 95 },
        { Id: 4, Name: "Physical Education", Mark: 95 }
      ]),
      new Student(2, [
        {Id: 1, Name: "Math", Mark: 80 },
        {Id: 2, Name: "Science", Mark: 80 },
        {Id: 3, Name: "Literature", Mark: 80 },
        {Id: 4, Name: "Physical Education", Mark: 80 }
      ]),
      new Student(3, [
        {Id: 1, Name: "Math", Mark: 50 },
        {Id: 2, Name: "Science", Mark: 50 },
        {Id: 3, Name: "Literature", Mark: 50 },
        {Id: 4, Name: "Physical Education", Mark: 50 }
      ]),
      new Student(4, [
        {Id: 1, Name: "Math", Mark: 40 },
        {Id: 2, Name: "Science", Mark: 40 },
        {Id: 3, Name: "Literature", Mark: 40 },
        {Id: 4, Name: "Physical Education", Mark: 40 }
      ])
    ];
  }

  get students(): Student[] {
    return cloneDeep(this._students);
  }

  getStudent(id: number): Student | null {
    let students = this.students;
    let student: Student | null = null;

    for (let i = 0; i < students.length; i++)
    {
      if (id == students[i].Id)
      {
        student = students[i];
      }
    }

    return student;
  }
}
