import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                <h3 >Student: {{ this.model.student.name  }}</h3>
                <h4>List of Enrolled Courses    
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                          
                          
                            
                        </tr>

                    </thead>
                    <tbody v-if="this.courses.length > 0" >
                        <tr v-for="(course,index) in this.courses" :key="index" >
                            <td>{{ course.id }}</td>
                            <td>{{ course.name }}</td>   
                          
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
    name:'CourseShowStudents',
    data(){
        return {
            courses: [],
            students:[],
            errorList: '',
            courseId: '',
            model: {
                student: {
                    name: ''
                    
                    
                }
                

            }
           
        }
    },
    mounted(){

        this.studentId = this.$route.params.id;
        this.getStudentCourses(this.$route.params.id)
       // this.getCourses();
       
      
    }, 
    methods: {
        getStudentCourses(studentId){
            axios.get(`http://127.0.0.1:8000/api/students/${studentId}`).then(res =>{
                
               // this.courses = res.data.courses;
               console.log(res.data);

              // this.model.course = res.data.course ;

              this.courses = res.data.student.courses;

              this.model.student.name = res.data.student.name;
            //  this.courseId =res.data.course.id;



               

            });
        },
       

  
    },
  }
  </script>