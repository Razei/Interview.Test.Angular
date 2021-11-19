import { Pipe, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { DiplomasRepositoryService } from './data/diplomas-repository/diplomas-repository.service';
import { StudentRepositoryService } from './data/student-repository/student-repository.service';
import { Diploma } from './models/diploma.interface';
import { Student } from './models/student.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockHasGraduatedPipe,
      ],
      providers: [
        { provide: StudentRepositoryService, useValue: mockStudentRepositoryService },
        { provide: DiplomasRepositoryService, useValue: mockDiplomasRepositoryService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GraduationTracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Graduation Tracker');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Graduation Tracker app is running!');
  });

  it('should render diploma table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const diplomaTable = compiled.querySelector('.diploma');

    let tableRows = diplomaTable?.querySelectorAll('tr') as NodeListOf<HTMLTableRowElement> ;

    expect(diplomaTable).toBeTruthy();
    expect(tableRows[0].cells[0].innerHTML).toBe('Id:');
    expect(tableRows[0].cells[1].innerHTML).toBe('1');

    expect(tableRows[1].cells[0].innerHTML).toBe('Credits:');
    expect(tableRows[1].cells[1].innerHTML).toBe('4');

    expect(tableRows[2].cells[0].innerHTML).toBe('Requirements:');
    expect(tableRows[2].cells[1].innerHTML).toBe('100,102,103,104');
  });

  it('should render students', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const student = mockStudentRepositoryService.students[0];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const students = compiled.querySelectorAll('.student');
    const heading = students[0].querySelector('h3');
    const list = students[0].querySelectorAll('ul li') as NodeListOf<HTMLLIElement>;
    const hasGraduatedDiv = students[0].querySelector('.has-graduated');

    expect(heading?.innerHTML).toBe(`Student ${student.Id}`);

    expect(list[0].innerHTML).toBe(`${student.Courses[0].Name} - Mark: ${student.Courses[0].Mark}`);
    expect(hasGraduatedDiv?.innerHTML).toBe('Has graduated? test');
  });
});

const mockStudentRepositoryService = {
  students: [
    new Student(1, [
      { Id: 1, Name: "Math", Mark: 95 },
      { Id: 2, Name: "Science", Mark: 95 },
      { Id: 3, Name: "Literature", Mark: 95 },
      { Id: 4, Name: "Physical Education", Mark: 95 }
    ]),
  ]
};

const mockDiplomasRepositoryService = {
  getDiploma: (): Diploma => ({
    Id: 1,
    Credits: 4,
    Requirements: [ 100, 102, 103, 104 ]
  })
};


@Pipe({
  name: 'hasGraduated'
})
export class MockHasGraduatedPipe implements PipeTransform {
  transform(args?: any) {
    return 'test';
  }
}