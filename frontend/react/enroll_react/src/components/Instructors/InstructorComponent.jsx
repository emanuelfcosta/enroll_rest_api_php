import React, { useState, useEffect } from 'react'
import { createInstructor, getInstructor, updateInstructor } from '../../services/InstructorService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../../services/DepartmentService';

const InstructorComponent = () => {

  const [name, setName] = useState('')

  const[departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])

  
  useEffect(()=> {
    getAllDepartments().then((response) => {
      console.log(response.data)
      setDepartments(response.data.departments);
    }).catch(error => {
      console.error(error);
    })
},[])

 

  const {id} = useParams();

  const [errors, setErrors] = useState({
    name: '',
    department: ''
   })

  const navigator = useNavigate();

  useEffect(() => {
    if(id){
      getInstructor(id).then((response) => {
       // console.log(response.data.instructor.department_id)
        setName(response.data.instructor.name);
        setDepartmentId(response.data.instructor.department_id)
      }).catch(error=> {
        console.error(error);
      })
    }

},[id])

 

  function saveOrUpdateInstructor(e){
    e.preventDefault();

    if(validateForm()){

      const instructor = {name, departmentId}
      console.log(instructor) 

        if(id){

         updateInstructor(id,instructor).then((response) =>{

           console.log(response.data);
           navigator('/instructors');

         }).catch(error=> {
           console.error(error);
         })

         } else {

        
        createInstructor(instructor).then((response)=>{
           console.log(response.data);
           navigator('/instructors')

         }).catch(error => {
           console.error(error);
         })
         
       }
            
   }
}//saveInstructor

function validateForm(){
  let valid = true;

  const errorsCopy = {... errors}

  if(name.trim()){
    errorsCopy.name = '';
  } else{
    errorsCopy.name = 'Name is required';
    valid = false;
  }

  if(departmentId){
    errorsCopy.department = '';
  } else{
    errorsCopy.department = 'Select Department';
    valid = false;
  }

  

  setErrors(errorsCopy);

  return valid;

 }//validateForm

 function pageTitle(){

  if(id){
    return <h2 className='text-center'>Update Employee</h2>
  }else{

    return <h2 className='text-center'>Add Employee</h2>
  }

 }



  return (
    <div className='container'>
        <br/><br/> 
      <div className='row'>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
      {
             pageTitle()  
      }
        <div className='card-body'>
        <form>
            <div className='form-group mb-2'>
              <label className='form-label'>Name:</label>
              <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    className={`form-control ${errors.name ? 'is-invalid':'' }`} 
                    onChange={(e) => setName(e.target.value)}
              >
              </input>
              {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
            </div>

            <div className='form-group mb-2'>
                    <label className='form-label'>Select Department:</label>
                    <select
                    
                    className={`form-control ${errors.department ? 'is-invalid':'' }`}
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    >
                      <option value="Select Department">Select Department</option>
                      {
                        departments.map(department =>
                          <option key={department.id} value={department.id}>{department.name}</option>
                          )
                      }

                    </select>

                    {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                  </div>

            <button className='btn btn-success' onClick={saveOrUpdateInstructor}> Submit </button>
        </form>
        </div>

      </div>
      </div>
     
    </div>
  )
}

export default InstructorComponent