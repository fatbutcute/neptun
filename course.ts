export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  maxStudents: number;
  enrolledStudents: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}