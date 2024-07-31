import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStudents } from '../../services/StudentService';
import { enrollStudent, getAllCourses } from '../../services/CourseService';

const EnrollComponent = () => {



  const[studentId, setStudentId] = useState('')
  const [students, setStudents] = useState([])

  const[courseId, setCourseId] = useState('')
  const [courses, setCourses] = useState([])

  const navigator = useNavigate();

  useEffect(()=> {
    
    getAllStudents().then((response) => {
      console.log(response.data)
      setStudents(response.data.students);
    }).catch(error => {
      console.error(error);
    })

},[])

useEffect(()=> {
    
    
    getAllCourses().then((response) => {
      console.log(response.data)
      setCourses(response.data.courses);
    }).catch(error => {
      console.error(error);
    })

},[])


function enroll(e){
    e.preventDefault();

    

      const enroll = {studentId, courseId}
      console.log(enroll) 

        if(studentId && courseId){

            
            enrollStudent(enroll).then((response) =>{

           console.log(response.data);
           navigator('/courses');

         }).catch(error=> {
           console.error(error);
         })

         
       }
            
   
}//saveInstructor






  return (
    <div className='container'><br /> <br />
    <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
        <h2 className='text-center'>Enroll Student</h2>
            <div className='card-body'>
                <form>
                    
                    <div className='form-group mb-2'>
                    <label className='form-label'> Student:</label>
                    <select
                    
                    className='form-control'
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    >
                      <option value="Select Student">Select Student</option>
                      {
                        students.map(student =>
                          <option key={student.id} value={student.id}>{student.name}</option>
                          )
                      }

                    </select>

                    
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'> Course:</label>
                    <select
                    
                    className='form-control'
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    >
                      <option value="Select Course">Select Course</option>
                      {
                        courses.map(course =>
                          <option key={course.id} value={course.id}>{course.name}</option>
                          )
                      }

                    </select>

                    
                  </div>




                   
                    <button className='btn btn-warning mb-2' onClick={(e) => enroll(e)}>Subscribe</button>
                </form>
            </div>
        </div>
    </div>
    
</div>
  )
}

export default EnrollComponent