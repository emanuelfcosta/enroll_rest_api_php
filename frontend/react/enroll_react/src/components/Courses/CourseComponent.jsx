import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse, getAllCourses, getCourseById, updateCourse } from '../../services/CourseService';
import { listInstructors } from '../../services/InstructorService';

const CourseComponent = () => {

    const [name, setName] =  useState('')

    const[instructorId, setInstructorId] = useState('')
    const [instructors, setInstructors] = useState([])

    useEffect(()=> {
        
        listInstructors().then((response) => {
          console.log(response.data)
          setInstructors(response.data.instructors);
        }).catch(error => {
          console.error(error);
        })
    },[])

    const {id} = useParams();

    const [errors, setErrors] = useState({
        name: '',
        instructor: ''
       })

    const  navigator = useNavigate();

    useEffect(()=> {
        if(id){   
        getCourseById(id).then((response) => {


            console.log(response.data);
            
            setName(response.data.course.name);
            setInstructorId(response.data.course.instructor_id)
            
    
        }).catch(error =>{
            console.error(error);
        })
        }
      },[id])


    function saveOrUpdateCourse(e){
        e.preventDefault();

        if(validateForm()){
    
        const course = {name, instructorId}
    
        console.log(course);
    
        if(id){

            updateCourse(id, course).then((response) =>{
                console.log(response.data);
                navigator('/courses');
            }).catch(error=> {
                console.error(error);
            })
        } else {
            
            
           createCourse(course).then((response) => {
                console.log(response.data);
                navigator('/courses')
            }).catch(error => {
                console.error(error);
            })
    
       }
    
    }
        
      }//save course


      function validateForm(){
        let valid = true;
      
        const errorsCopy = {... errors}
      
        if(name.trim()){
          errorsCopy.name = '';
        } else{
          errorsCopy.name = 'Name is required';
          valid = false;
        }
      
        if(instructorId){
          errorsCopy.instructor = '';
        } else{
          errorsCopy.instructor = 'Select Instructor';
          valid = false;
        }
      
        
      
        setErrors(errorsCopy);
      
        return valid;
      
       }//validateForm



      function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Course</h2>
        }else{
            return <h2 className='text-center'>Add Course</h2>
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
                         name='courseName'
                         placeholder='name'
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className={`form-control ${errors.name ? 'is-invalid':'' }`}
                        >
                        </input>
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                    <div className='form-group mb-2'>
                    <label className='form-label'>Select Instructor:</label>
                    <select
                    
                    className={`form-control ${errors.instructor ? 'is-invalid':'' }`}
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    >
                      <option value="Select Instructor">Select Instructor</option>
                      {
                        instructors.map(instructor =>
                          <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                          )
                      }

                    </select>

                    {errors.instructor && <div className='invalid-feedback'>{errors.instructor}</div>}
                  </div>
                   
                    <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateCourse(e)}>Submit</button>
                </form>
            </div>
        </div>
    </div>
    
</div>
  )
}

export default CourseComponent