import { Course } from "./course.interface";

export interface Requirement
{
    Id: number;
    Name: string;
    MinimumMark: number;
    Credits: number;
    Courses: number[];
}
