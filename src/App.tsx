import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { CourseCard } from './components/CourseCard';
import { useCourseStore } from './store/courseStore';

function App() {
  const { courseService, courses, currentStudent, loadCourses, enrollInCourse, setCurrentStudent } = useCourseStore();

  useEffect(() => {
    // Initialize with sample data
    courseService.addCourse({
      id: '1',
      name: 'A rendszerfejlesztés technológiája és módszertana',
      description: 'Ismerje meg az informatika és a programozás alapjait.',
      instructor: 'Vegera József',
      credits: 5,
      maxStudents: 62,
      enrolledStudents: 0,
    });


    const sampleStudent = {
      id: '1',
      name: 'Varga Áron Gábor',
      email: 'vargaarongabor@gmail.com',
      enrolledCourses: [],
    };
    courseService.addStudent(sampleStudent);
    setCurrentStudent(sampleStudent);
    
    loadCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Nyíregyházi Egyetem Neptun felület</h1>
            </div>
            {currentStudent && (
              <div className="text-sm text-gray-600">
                Üdvözöljük, {currentStudent.name}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={() => enrollInCourse(course.id)}
              isEnrolled={currentStudent?.enrolledCourses.includes(course.id) || false}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;