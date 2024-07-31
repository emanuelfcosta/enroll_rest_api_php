import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, getDepartmentById, updateDepartment } from '../../services/DepartmentService';

const DepartmentComponent = () => {

    const [name, setName] =  useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        name: ''
       })

    const  navigator = useNavigate();

    useEffect(()=> {

        if(id){  
         
        getDepartmentById(id).then((response) => {
            //console.log(response.data.department.name)
            setName(response.data.department.name);
            
    
        }).catch(error =>{
            console.error(error);
        })
         }
      },[id])

    function saveOrUpdateDepartment(e){
        e.preventDefault();
    if(validateForm()){
    
        const department = {name}
    
        console.log(department);
    
        if(id){
            
            updateDepartment(id, department).then((response) =>{
                console.log(response.data);
                navigator('/departments');
            }).catch(error=> {
                console.error(error);
            })
        } else {
            
            createDepartment(department).then((response) => {
                console.log(response.data);
                navigator('/departments')
            }).catch(error => {
                console.error(error);
            })
    
       }
    
      }
        
      }//save departarment

      function validateForm(){
        let valid = true;
      
        const errorsCopy = {... errors}
      
        if(name.trim()){
          errorsCopy.name = '';
        } else{
          errorsCopy.name = 'Name is required';
          valid = false;
        }
      
        setErrors(errorsCopy);
      
        return valid;
      
       }//validateForm

      function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Department</h2>
        }else{
            return <h2 className='text-center'>Add Department</h2>
        }
      }


  return (
    <div className='container'><br /> <br />
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
                         name='departmentName'
                         placeholder='Name'
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className={`form-control ${errors.name ? 'is-invalid':'' }`} 
                        >
                        </input>
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                   
                    <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                </form>
            </div>
        </div>
    </div>
    
</div>
  )
}

export default DepartmentComponent