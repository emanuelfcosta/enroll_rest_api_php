import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getInstructor } from '../../services/InstructorService';
import { getStudentById } from '../../services/StudentService';

function ListCoursesStudent() {

    const {id} = useParams();

    const [courses, setCourses] =  useState([]);
    const [name, setName] =  useState([]);

    useEffect(()=> {
        listOfCourses(id)
       
      },[id])

      function listOfCourses(id){
        if(id){   
            
            
            getStudentById(id).then((response) => {
    
    
                console.log(response.data);
                  setCourses(response.data.student.courses);
                  setName(response.data.student.name);
                // setName(response.data.course.name);
                // setInstructorId(response.data.course.instructor_id)
                
        
            }).catch(error =>{
                console.error(error);
            })
            }
      }  


  return (
    <div className='container'>
    <h2 className='text-center'>List of Courses</h2>
    <h3> <font color="blue"> Student: </font>   {name}  </h3>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th> Id</th>
                <th> Name</th>
                
            </tr>
        </thead>
        <tbody>
            {
                courses.map( course =>
                         <tr key={course.id}>
                            <td> {course.id}</td>
                            <td> {course.name}</td>
                          
                
                         </tr>
                    )
            }
        </tbody>
    </table>

</div>
  )
}

export default ListCoursesStudent