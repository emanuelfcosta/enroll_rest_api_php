
import './App.css'
import CourseComponent from './components/Courses/CourseComponent'
import ListCourseComponent from './components/Courses/ListCourseComponent'
import DepartmentComponent from './components/Departments/DepartmentComponent'
import ListDepartmentComponent from './components/Departments/ListDepartmentComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import InstructorComponent from './components/Instructors/InstructorComponent'
import ListInstructorComponent from './components/Instructors/ListInstructorComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ListStudentComponent from './components/Students/ListStudentComponent'
import StudentComponent from './components/Students/StudentComponent'
import EnrollComponent from './components/Courses/EnrollComponent'
import ListStudentsCourse from './components/Courses/ListStudentsCourse'
import ListCoursesStudent from './components/Students/ListCoursesStudent'
import IndexComponent from './components/IndexComponent'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
      <Routes>

        {/* ----------- instructors ----------- */}

         {/* //localhost:5173 */}
         <Route path='/' element = {<IndexComponent/>}></Route>
        {/* //localhost:5173/instructors */}
        <Route path='/instructors' element = {<ListInstructorComponent/>}></Route>
        {/* //localhost:5173/add-instructor */}
        <Route path='/add-instructor' element ={ <InstructorComponent/>} ></Route>
        {/* //localhost:5173/edit-instructor/1 */}
        <Route path='/edit-instructor/:id' element = { <InstructorComponent/>}></Route>

        {/* ----------- departments ----------- */}

        {/* //localhost:5173/departments */}
        <Route path='/departments' element = {<ListDepartmentComponent/>}></Route>

        {/* //localhost:5173/add-department */}
        <Route path='/add-department' element = {<DepartmentComponent/>}></Route>

          {/* //localhost:5173/edit-department/1 */}
        <Route path='/edit-department/:id' element = {<DepartmentComponent/>}></Route>

        {/* ----------- courses ----------- */}

        {/* //localhost:5173/courses */}
        <Route path='/courses' element = {<ListCourseComponent/>}></Route>

        {/* //localhost:5173/add-course */}
        <Route path='/add-course' element = {< CourseComponent/>}></Route>

        {/* //localhost:5173/edit-course/1 */}
        <Route path='/edit-course/:id' element = {<CourseComponent/>}></Route>

        {/* ----------- enroll Student ----------- */}
         {/* //localhost:5173/enroll-student/1 */}
         <Route path='/enroll-student' element = {< EnrollComponent/>}></Route>

          {/* //localhost:5173/students-course/1 */}
        <Route path='/students-course/:id' element = {< ListStudentsCourse />}></Route>

        {/* ----------- students ----------- */}

        {/* //localhost:5173/students */}
        <Route path='/students' element = {<ListStudentComponent/>}></Route>

         {/* //localhost:5173/add-student */}
         <Route path='/add-student' element = {< StudentComponent />}></Route>

          {/* //localhost:5173/edit-student/1 */}
        <Route path='/edit-student/:id' element = {<StudentComponent/>}></Route>

          {/* //localhost:5173/courses-student/1 */}
          <Route path='/courses-student/:id' element = {<ListCoursesStudent />}></Route>


      </Routes>
      {/* <FooterComponent/> */}

     
      </BrowserRouter>
    </>
 
  )
}

export default App
