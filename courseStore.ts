import { create } from 'zustand';
import { Course, Student } from '../types/course';
import { CourseService } from '../services/CourseService';

interface CourseStore {
  courseService: CourseService;
  courses: Course[];
  currentStudent: Student | null;
  loadCourses: () => void;
  enrollInCourse: (courseId: string) => boolean;
  setCurrentStudent: (student: Student) => void;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courseService: new CourseService(),
  courses: [],
  currentStudent: null,

  loadCourses: () => {
    const courses = get().courseService.getAllCourses();
    set({ courses });
  },

  enrollInCourse: (courseId: string) => {
    const { courseService, currentStudent } = get();
    if (!currentStudent) return false;

    const success = courseService.enrollStudent(currentStudent.id, courseId);
    if (success) {
      get().loadCourses();
    }
    return success;
  },

  setCurrentStudent: (student: Student) => {
    set({ currentStudent: student });
  },
}));