import { Course, Student } from '../types/course';

export class CourseService {
  private courses: Map<string, Course>;
  private students: Map<string, Student>;

  constructor() {
    this.courses = new Map();
    this.students = new Map();
  }

  addCourse(course: Course): void {
    this.courses.set(course.id, course);
  }

  getCourse(id: string): Course | undefined {
    return this.courses.get(id);
  }

  getAllCourses(): Course[] {
    return Array.from(this.courses.values());
  }

  enrollStudent(studentId: string, courseId: string): boolean {
    const course = this.courses.get(courseId);
    const student = this.students.get(studentId);

    if (!course || !student) {
      return false;
    }

    if (course.enrolledStudents >= course.maxStudents) {
      return false;
    }

    if (student.enrolledCourses.includes(courseId)) {
      return false;
    }

    course.enrolledStudents += 1;
    student.enrolledCourses.push(courseId);
    return true;
  }

  addStudent(student: Student): void {
    this.students.set(student.id, student);
  }

  getStudent(id: string): Student | undefined {
    return this.students.get(id);
  }
}