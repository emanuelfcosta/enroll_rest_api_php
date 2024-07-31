import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                <h4>Courses
                    <RouterLink to="/courses/create" class="btn btn-primary float-end">
                        Add Course
                    </RouterLink>

                    <RouterLink :to="{path: '/courses/students/enrollment' }" class="btn btn-success float-end">
                        Enroll Student
                    </RouterLink> 
                </h4>
             
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                          
                            
                        </tr>

                    </thead>
                    <tbody v-if="this.courses.length > 0" >
                        <tr v-for="(course,index) in this.courses" :key="index" >
                            <td>{{ course.id }}</td>
                            <td>{{ course.name }}</td>   
                            <td>{{ course.instructor.name }}</td>   
                            <td>
                                <RouterLink :to="{path: '/courses/edit/' + course.id }" class="btn btn-success ">
                                    Edit
                                </RouterLink>
                                <button type="button" @click="deleteCourse(course.id)" class="btn btn-danger ">
                                    Delete
                                </button>

                                <RouterLink :to="{path: '/courses/students/show/' + course.id }" class="btn btn-warning ">
                                    Students
                                </RouterLink>

                                

                            </td>                        
                           

                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

  export default {
    name:'courses',
    data(){
        return {
            courses: []
           
        }
    },
    mounted(){
        this.getCourses();
       
      
    }, 
    methods: {
        getCourses(){
            axios.get('http://127.0.0.1:8000/api/courses').then(res =>{
                
                this.courses = res.data.courses;

               

            });
        },
       

        deleteCourse(courseId){

            

            if(confirm('are you sure do you wanto to delete this record?')){

                

              axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}`).then(res => {

                alert(res.data.message);
                this.getCourses();
             });

            }

        },

  
    },
  }
  </script>