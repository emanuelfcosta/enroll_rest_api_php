import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteStudent, getAllStudents } from '../../services/StudentService';

const ListStudentComponent = () => {

    const [students, setStudents] =  useState([]);

    const navigator = useNavigate();

    useEffect(()=> {
        
        listOfStudents();
   },[] )

   function listOfStudents(){
      
   getAllStudents().then((response)=> {
        console.log(response.data);
        setStudents(response.data.students);
     }).catch(error => {
        console.error(error);
     })

   }

   function updateStudent(id){
    navigator(`/edit-student/${id}`)

   }

   function removeStudent(id){
    
    deleteStudent(id).then((response)=> {
           console.log(response.data);
           listOfStudents();

    }).catch(error => {
      console.error(error);
    })

 } 

 function showCourses(id){
  navigator(`/courses-student/${id}`)

 }



  return (
    <div className='container'>
    <h2 className='text-center'>List of Students</h2>
    <Link to='/add-student' className='btn btn-primary mb-2'>Add Student</Link>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th> Id</th>
                <th> Name</th> 
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
            {
                students.map( student =>
                         <tr key={student.id}>
                            <td> {student.id}</td>
                            <td> {student.name}</td>
                
                            <th>
                                <button onClick={()=> updateStudent(student.id)} className='btn btn-info' >Update</button>
                                <button onClick={() => removeStudent (student.id)} className='btn btn-danger'
                                  style={{ marginLeft: "10px" }}
                                >Delete</button>
                                <button onClick={() => showCourses (student.id)} className='btn btn-success'
                                  style={{ marginLeft: "10px" }}
                                >Courses</button>


                            </th>

                         </tr>
                    )
            }
        </tbody>
    </table>

</div>
  )
}

export default ListStudentComponent