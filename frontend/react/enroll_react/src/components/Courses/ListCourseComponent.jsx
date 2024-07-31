import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteCourse, getAllCourses } from '../../services/CourseService';
 
 const ListCourseComponent = () => {

    const [courses, setCourses] =  useState([]);

    const navigator = useNavigate();

    useEffect(()=> {
        
        listOfCourses();
   },[] )

   function listOfCourses(){
      
    getAllCourses().then((response)=> {
        console.log(response.data);
        setCourses(response.data.courses);
     }).catch(error => {
        console.error(error);
     })

   }

   function updateCourse(id){
    navigator(`/edit-course/${id}`)

   }

   function removeCourse(id){
    
    deleteCourse(id).then((response)=> {
           console.log(response.data);
           listOfCourses();

    }).catch(error => {
      console.error(error);
    })

 } 

 function showStudents(id){
  navigator(`/students-course/${id}`)

 }


   return (
    <div className='container'>
    <h2 className='text-center'>List of Courses</h2>
    <Link to='/add-course' className='btn btn-primary mb-2'>Add Course</Link>
    <br></br>
    <Link to='/enroll-student' className='btn btn-warning mb-2'>Enroll Student</Link>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th> Id</th>
                <th> Name</th>
                <th> Instructor</th> 
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
            {
                courses.map( course =>
                         <tr key={course.id}>
                            <td> {course.id}</td>
                            <td> {course.name}</td>
                            <td> {course.instructor.name}</td>
                
                            <th>
                                <button onClick={()=> updateCourse(course.id)} className='btn btn-info' >Update</button>
                                <button onClick={() => removeCourse (course.id)} className='btn btn-danger'
                                  style={{ marginLeft: "10px" }}
                                >Delete</button>
                                <button onClick={() => showStudents (course.id)} className='btn btn-success'
                                  style={{ marginLeft: "10px" }}
                                >Students</button>
                            </th>

                         </tr>
                    )
            }
        </tbody>
    </table>

</div>
   )
 }
 
 export default ListCourseComponent