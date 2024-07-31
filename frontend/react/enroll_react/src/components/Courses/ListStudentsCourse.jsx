import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCourseById, unsubscribe } from '../../services/CourseService';

const ListStudentsCourse = () => {

    const {id} = useParams();

    const [students, setStudents] =  useState([]);
    const [name, setName] =  useState([]);

    useEffect(()=> {
        listOfStudents(id)
       
      },[id])

      function listOfStudents(id){
        if(id){   
        
            getCourseById(id).then((response) => {
    
    
                console.log(response.data);
                  setStudents(response.data.course.students);
                  setName(response.data.course.name);
                // setName(response.data.course.name);
                // setInstructorId(response.data.course.instructor_id)
                
        
            }).catch(error =>{
                console.error(error);
            })
            }
      }

      
    
      function unsubscribeStudent(id, studentId){
      
        unsubscribe(id, studentId).then((response)=> {
               console.log(response.data);
               listOfStudents(id);
    
        }).catch(error => {
          console.error(error);
        })
    
     } 





  return (
    <div className='container'>
    <h2 className='text-center'>List of Students</h2>
    <h3> <font color="blue"> Course: </font>   {name}  </h3>
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
                                <button onClick={()=> unsubscribeStudent(id, student.id)} className='btn btn-danger' >Unsubscribe</button>
                                
                                
                            </th>

                         </tr>
                    )
            }
        </tbody>
    </table>

</div>
  )
}

export default ListStudentsCourse