import React from 'react';
import { GraduationCap, Users } from 'lucide-react';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onEnroll: () => void;
  isEnrolled: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, isEnrolled }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
        <span className="text-sm font-medium text-gray-500">{course.credits} Credits</span>
      </div>
      
      <p className="text-gray-600 mb-4">{course.description}</p>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {course.enrolledStudents}/{course.maxStudents}
          </span>
        </div>
      </div>

      <button
        onClick={onEnroll}
        disabled={isEnrolled || course.enrolledStudents >= course.maxStudents}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          isEnrolled
            ? 'bg-green-100 text-green-700 cursor-default'
            : course.enrolledStudents >= course.maxStudents
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isEnrolled ? 'Felvéve.' : course.enrolledStudents >= course.maxStudents ? 'Course Full' : 'Felvesz'}
      </button>
    </div>
  );
};