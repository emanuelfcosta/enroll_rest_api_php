import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DepartmentView from '../views/Departments/IndexDepartment.vue'
import DepartmentCreate from '../views/Departments/CreateDepartment.vue'
import DepartmentEdit from '../views/Departments/EditDepartment.vue'
import InstructorView from '../views/Instructors/IndexInstructor.vue'
import InstructorCreate from '../views/Instructors/CreateInstructor.vue'
import InstructorEdit from '../views/Instructors/EditInstructor.vue'
import CourseView from '../views/Courses/IndexCourse.vue'
import CourseCreate from '../views/Courses/CreateCourse.vue'
import CourseEdit from '../views/Courses/EditCourse.vue'
import CourseShowStudents from '../views/Courses/CourseListStudents.vue'
import CourseEnrollmentStudents from '../views/Courses/CourseEnrollmentStudents.vue'
import StudentView from '../views/Students/IndexStudent.vue'
import StudentCreate from '../views/Students/CreateStudent.vue'
import StudentEdit from '../views/Students/EditStudent.vue'
import StudentShowCourses from '../views/Students/StudentListCourses.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/departments',
      name: 'departments',
      component: DepartmentView
    },
    {
      path: '/departments/create',
      name: 'departmentsCreate',
      component: DepartmentCreate
    },
    {
      path: '/departments/edit/:id' ,
      name: 'departmentsEdit',
      component: DepartmentEdit
    },
    {
      path: '/instructors',
      name: 'instructors',
      component: InstructorView
    },
    {
      path: '/instructors/create',
      name: 'instructorsCreate',
      component: InstructorCreate
    },
    {
      path: '/instructors/edit/:id' ,
      name: 'instructorsEdit',
      component: InstructorEdit
    },
    {
      path: '/courses',
      name: 'courses',
      component: CourseView
    },
    {
      path: '/courses/create',
      name: 'coursesCreate',
      component: CourseCreate
    },
    {
      path: '/courses/edit/:id' ,
      name: 'coursesEdit',
      component: CourseEdit
    },
    {
      path: '/courses/students/show/:id' ,
      name: 'coursesShowStudents',
      component: CourseShowStudents
    },
    {
      path: '/courses/students/enrollment' ,
      name: 'coursesEnrollmentStudents',
      component: CourseEnrollmentStudents
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView
    },
    {
      path: '/students/create',
      name: 'studentsCreate',
      component: StudentCreate
    },
    {
      path: '/students/edit/:id' ,
      name: 'studentsEdit',
      component: StudentEdit
    },
    {
      path: '/students/courses/show/:id' ,
      name: 'studentsShowCourses',
      component: StudentShowCourses
    }
    
    
  ]
})

export default router
