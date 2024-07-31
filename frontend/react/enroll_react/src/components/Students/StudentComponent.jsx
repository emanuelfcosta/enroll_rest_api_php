import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createStudent, getStudentById, updateStudent } from '../../services/StudentService';

function StudentComponent() {

    const [name, setName] =  useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        name: ''
       })

    const  navigator = useNavigate();

    useEffect(()=> {
        if(id){   
            getStudentById(id).then((response) => {


           // console.log(response.data);
            
            setName(response.data.student.name);
            
    
        }).catch(error =>{
            console.error(error);
        })
        }
      },[id])



    function saveOrUpdateStudent(e){
        e.preventDefault();

        if(validateForm()){
    
        const student = {name}
    
        console.log(student);
    
        if(id){ 

            updateStudent(id, student).then((response) =>{
                //console.log(response.data);
                navigator('/students');
            }).catch(error=> {
                console.error(error);
            })
        } else {
            
            
        createStudent(student).then((response) => {
                console.log(response.data);
                navigator('/students')
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
            return <h2 className='text-center'>Update Student</h2>
        }else{
            return <h2 className='text-center'>Add Student</h2>
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
                         name='studentName'
                         placeholder='name'
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className={`form-control ${errors.name ? 'is-invalid':'' }`} 
                        >
                        </input>
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                   
                    <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateStudent(e)}>Submit</button>
                </form>
            </div>
        </div>
    </div>
    
</div>
  )
}

export default StudentComponent