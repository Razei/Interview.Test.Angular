import { TestBed } from '@angular/core/testing';
import { RequirementsRepositoryService } from '../data/requirements-repository/requirements-repository.service';
import { Diploma } from '../models/diploma.interface';
import { Requirement } from '../models/requirement.interface';
import { STANDING } from '../models/standing.enum';
import { Student } from '../models/student.model';
import { HasGraduatedPipe } from './has-graduated.pipe';

describe('Pipe: HasGraduated', () => {
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

  describe('hasGraduated()', () => {
    it('should have credits', () => {
      const graduated: [boolean, STANDING, number][] = [];

      mockStudentsFactory().forEach(student => {
        graduated.push(pipe.transform(student, mockDiplomaFactory()));
      });

      // check for credits
      graduated.forEach(graduate => {
        expect(graduate[2]).toBeDefined();;
      })
    });

    describe('switch case', () => {
      let mockStudent: Student;
      let mockDiploma: Diploma;
      let mockRequirement: Requirement;

      // repetitive mutations moved to beforeEach
      beforeEach(() => {
        mockStudent = mockStudentsFactory()[0];
        mockStudent.Courses = [{ Id: 1, Name: "Math", Mark: 40 }];

        mockDiploma = mockDiplomaFactory();
        mockDiploma.Requirements = [100];
        mockRequirement = { Id: 100, Name: "Math", MinimumMark: 99, Courses: [1], Credits: 1 };
      });

      it('should return [false, 4, 0] if student has no matched courses', () => {
        mockStudent.Courses = [];

        const result = pipe.transform(mockStudent, mockDiploma);

        expect(result[0]).toEqual(false);
        expect(result[1]).toEqual(4);
        expect(result[2]).toEqual(0);
      });

      it('should return [false, 4, 1] if student course.Mark > requirement.MinimumMark', () => {
        const mockRepository = TestBed.inject(RequirementsRepositoryService) as typeof mockRequirementsRepositoryService;

        mockRepository.getRequirement = () => mockRequirement;
        mockStudent.Courses = [{ Id: 1, Name: "Math", Mark: 100 },];

        const result = pipe.transform(mockStudent, mockDiploma);

        expect(result[0]).toEqual(true);
        expect(result[1]).toEqual(1);
        expect(result[2]).toEqual(1);
      });

      it('should return [true, 3, 0] if student (50 < average < 80)', () => {
        const mockRepository = TestBed.inject(RequirementsRepositoryService) as typeof mockRequirementsRepositoryService;

        mockRepository.getRequirement = () => mockRequirement;
        mockStudent.Courses = [{ Id: 1, Name: "Math", Mark: 79 },];

        const result = pipe.transform(mockStudent, mockDiploma);

        expect(result[0]).toEqual(true);
        expect(result[1]).toEqual(3);
        expect(result[2]).toEqual(0);
      });

      it('should return [true, 2, 0] if student (80 < average < 95)', () => {
        const mockRepository = TestBed.inject(RequirementsRepositoryService) as typeof mockRequirementsRepositoryService;

        mockRepository.getRequirement = () => mockRequirement;
        mockStudent.Courses = [{ Id: 1, Name: "Math", Mark: 90 },];

        const result = pipe.transform(mockStudent, mockDiploma);

        expect(result[0]).toEqual(true);
        expect(result[1]).toEqual(2);
        expect(result[2]).toEqual(0);
      });

      it('should return [true, 1, 0] if student average > 95', () => {
        const mockRepository = TestBed.inject(RequirementsRepositoryService) as typeof mockRequirementsRepositoryService;

        mockRepository.getRequirement = () => mockRequirement;
        mockStudent.Courses = [{ Id: 1, Name: "Math", Mark: 96 },];

        const result = pipe.transform(mockStudent, mockDiploma);

        expect(result[0]).toEqual(true);
        expect(result[1]).toEqual(1);
        expect(result[2]).toEqual(0);
      });
    });
  });
});

const mockRequirementsRepositoryService = {
  getRequirement: (id: number) => mockRequirementFactory().find(requirement => requirement.Id === id)
};

// factory pattern to prevent mock objects being mutated and affecting other specs
const mockDiplomaFactory = (): Diploma => ({
  Id: 1,
  Credits: 4,
  Requirements: [ 100, 102, 103, 104 ]
});

const mockStudentsFactory = (): Student[] => [
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

const mockRequirementFactory = (): Requirement[] => [
  { Id: 100, Name: "Math", MinimumMark: 50, Courses: [1], Credits: 1 },
  { Id: 102, Name: "Science", MinimumMark: 50, Courses: [2], Credits: 1 },
  { Id: 103, Name: "Literature", MinimumMark :50, Courses: [3], Credits: 1},
  { Id: 104, Name: "Physical Education", MinimumMark: 50, Courses: [4], Credits: 1 }
];