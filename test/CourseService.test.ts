import { describe, it, expect, beforeEach } from 'vitest';
import { CourseService } from '../services/CourseService';
import { Course, Student } from '../types/course';

describe('CourseService', () => {
  let courseService: CourseService;
  let sampleCourse: Course;
  let sampleStudent: Student;

  beforeEach(() => {
    courseService = new CourseService();
    sampleCourse = {
      id: '1',
      name: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      credits: 3,
      maxStudents: 2,
      enrolledStudents: 0,
    };
    sampleStudent = {
      id: '1',
      name: 'Test Student',
      email: 'test@test.com',
      enrolledCourses: [],
    };
  });

  it('should add and retrieve a course', () => {
    courseService.addCourse(sampleCourse);
    const retrieved = courseService.getCourse(sampleCourse.id);
    expect(retrieved).toEqual(sampleCourse);
  });

  it('should add and retrieve a student', () => {
    courseService.addStudent(sampleStudent);
    const retrieved = courseService.getStudent(sampleStudent.id);
    expect(retrieved).toEqual(sampleStudent);
  });

  it('should successfully enroll a student in a course', () => {
    courseService.addCourse(sampleCourse);
    courseService.addStudent(sampleStudent);
    
    const success = courseService.enrollStudent(sampleStudent.id, sampleCourse.id);
    expect(success).toBe(true);
    
    const updatedCourse = courseService.getCourse(sampleCourse.id);
    const updatedStudent = courseService.getStudent(sampleStudent.id);
    
    expect(updatedCourse?.enrolledStudents).toBe(1);
    expect(updatedStudent?.enrolledCourses).toContain(sampleCourse.id);
  });

  it('should not enroll student when course is full', () => {
    const fullCourse: Course = { ...sampleCourse, enrolledStudents: 2 };
    courseService.addCourse(fullCourse);
    courseService.addStudent(sampleStudent);
    
    const success = courseService.enrollStudent(sampleStudent.id, fullCourse.id);
    expect(success).toBe(false);
  });

  it('should not enroll student twice in the same course', () => {
    courseService.addCourse(sampleCourse);
    courseService.addStudent(sampleStudent);
    
    courseService.enrollStudent(sampleStudent.id, sampleCourse.id);
    const secondAttempt = courseService.enrollStudent(sampleStudent.id, sampleCourse.id);
    
    expect(secondAttempt).toBe(false);
  });
});