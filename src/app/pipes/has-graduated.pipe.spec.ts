import { TestBed } from '@angular/core/testing';
import { RequirementsRepositoryService } from '../data/requirements-repository/requirements-repository.service';
import { Diploma } from '../models/diploma.interface';
import { Requirement } from '../models/requirement.interface';
import { STANDING } from '../models/standing.enum';
import { Student } from '../models/student.model';
import { HasGraduatedPipe } from './has-graduated.pipe';

describe('Pipe: HasGraduatede', () => {
  let pipe: HasGraduatedPipe;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RequirementsRepositoryService, useValue: mockRequirementsRepositoryService },
      ]
    });
    pipe = new HasGraduatedPipe(TestBed.inject(RequirementsRepositoryService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should have credits', () => {
    const graduated: [boolean, STANDING, number][] = [];

    mockStudents.forEach(student => {
      graduated.push(pipe.transform(student, mockDiploma));
    });

    // check for credits
    graduated.forEach(graduate => {
      expect(graduate[2]).toBeDefined();;
    })
  });
});

const mockRequirementsRepositoryService = {
  getRequirement: (id: number) => mockRequirement.find(requirement => requirement.Id === id)
};

const mockDiploma: Diploma = {
  Id: 1,
  Credits: 4,
  Requirements: [ 100, 102, 103, 104 ]
};

const mockStudents: Student[] = [
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
    {Id: 4, Name: "Physichal Education", Mark: 80 }
  ]),
  new Student(3, [
    {Id: 1, Name: "Math", Mark: 50 },
    {Id: 2, Name: "Science", Mark: 50 },
    {Id: 3, Name: "Literature", Mark: 50 },
    {Id: 4, Name: "Physichal Education", Mark: 50 }
  ]),
  new Student(4, [
    {Id: 1, Name: "Math", Mark: 40 },
    {Id: 2, Name: "Science", Mark: 40 },
    {Id: 3, Name: "Literature", Mark: 40 },
    {Id: 4, Name: "Physichal Education", Mark: 40 }
  ])
];

const mockRequirement: Requirement[] = [
  { Id: 100, Name: "Math", MinimumMark: 50, Courses: [1], Credits: 1 },
  { Id: 102, Name: "Science", MinimumMark: 50, Courses: [2], Credits: 1 },
  { Id: 103, Name: "Literature", MinimumMark :50, Courses: [3], Credits: 1},
  { Id: 104, Name: "Physical Education", MinimumMark: 50, Courses: [4], Credits: 1 }
];