import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                
                <h4>Enroll Student
                    
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Course</label>
                    <select 
                       class="form-select" v-model="courseId" >
                        <option v-for="(course,index) in this.courses" :key="index" 
                        :value="course.id"  >
                            {{ course.name}}
                        </option> 
                    </select>

                </div>

                <div class="mb-3">
                    <label for="">Student</label>
                    <select 
                       class="form-select" v-model="studentId" >
                        <option v-for="(student,index) in this.students" :key="index" 
                        :value="student.id"  >
                            {{ student.name}}
                        </option> 
                    </select>

                </div>

                <div class="mb-3">
                      <button type="button" @click="enrollStudent" class="btn btn-primary">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

  export default {
    name:'coursesEnrollmentStudents',
    data(){
        return {
            courses: [],
            students: [],
            errorList: '',
            courseId: null,
            studentId: null,
            model: {
                student: {
                    name: ''
                        
                }
                

            }
           
        }
    },
    mounted(){

       // this.courseId = this.$route.params.id;
      //  this.getCourseStudents(this.$route.params.id)
       // this.getCourses();
       this.getStudents();
       this.getCourses();
       
      
    }, 
    methods: {
        getStudents(){
            axios.get(`http://127.0.0.1:8000/api/students`).then(res =>{
                
               // this.courses = res.data.courses;
             //  console.log(res.data);

              // this.model.course = res.data.course ;

              this.students = res.data.students;

             // this.model.course.name = res.data.course.name;


            });
        },

        getCourses(){
            axios.get(`http://127.0.0.1:8000/api/courses`).then(res =>{
                
               // this.courses = res.data.courses;
               console.log(res.data);

              // this.model.course = res.data.course ;

              this.courses = res.data.courses;

             // this.model.course.name = res.data.course.name;


            });
        },

        enrollStudent(){

            var mythis = this;

           // '/courses/{course_id}/student/{student_id}'
            // put('/courses/{course_id}/instructor/{instructor_id}'
            axios.put(`http://127.0.0.1:8000/api/courses/${this.courseId}/student/${this.studentId}`,this.model.course)
            .then(res=>{
            console.log(res.data);
            alert(res.data.message);  

            this.model.course = {
                    name: ''
                
                }
                this.errorList = '';

            
            })
            .catch(function (error) {

            
                
            if (error.response) {
                if(error.response.status == 422 ){

                    mythis.errorList = error.response.data.errors;
                }

            // console.error(error.response.data);
            // console.error(error.response.status);
            // console.error(error.response.headers);
            } else if (error.request) {

            console.error(error.request);
            } else {

            console.error('Error', error.message);
            }

});
}
       

        
  
    },
  }
  </script>