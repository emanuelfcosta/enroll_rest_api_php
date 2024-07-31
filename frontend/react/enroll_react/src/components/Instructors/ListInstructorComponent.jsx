import React, {useEffect, useState} from 'react'
import { deleteInstructor, listInstructors } from '../../services/InstructorService'
import { useNavigate } from 'react-router-dom'

const ListInstructorComponent = () => {

    const [instructors, setInstructors] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllInstructors();

    }, [])

    function getAllInstructors(){
         
        listInstructors().then((response) => {
           // console.log(response.data.instructors);
            setInstructors(response.data.instructors)
         }).catch(error => {
              console.error(error);
         })

    }

    function addNewInstructor(){
           navigator('/add-instructor')
    }

    function updateInstructor(id){

        navigator(`/edit-instructor/${id}`)

    }

    function removeInstructor(id){
        console.log(id);

        deleteInstructor(id).then((response) =>{

            getAllInstructors(); 

        }).catch(error => {
            console.error(error);
        })

    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Instructors</h2>
        <button className='btn btn-primary' onClick={addNewInstructor}> Add Instructor</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    instructors.map(instructor =>
                    <tr key={instructor.id}>
                        <td>{instructor.id}</td>
                        <td>{instructor.name}</td>
                        <td>{instructor.department.name}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=> updateInstructor(instructor.id)}>Update</button>
                            <button className='btn btn-danger' onClick={()=> removeInstructor(instructor.id)}
                            style={{ marginLeft: '10px' }} >Delete</button>
                        </td>

                    </tr>
                    )
                }
               
            </tbody>
        </table>
    </div>
  )
}

export default ListInstructorComponent