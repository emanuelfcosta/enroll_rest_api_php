import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                <h3 >Course: {{ this.model.course.name  }}</h3>
                <h4>List Students    
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                          
                            
                        </tr>

                    </thead>
                    <tbody v-if="this.students.length > 0" >
                        <tr v-for="(student,index) in this.students" :key="index" >
                            <td>{{ student.id }}</td>
                            <td>{{ student.name }}</td>   
                             
                            <td>
                                <!-- <RouterLink :to="{path: '/courses/edit/' + course.id }" class="btn btn-success ">
                                    Edit
                                </RouterLink> -->
                                <button type="button" @click="cancelEnrollStudent(student.id)" class="btn btn-danger ">
                                    Unsubscribe
                                </button>

                                <!-- <RouterLink :to="{path: '/courses/students/show/' + course.id }" class="btn btn-warning ">
                                    Students
                                </RouterLink> -->

                                

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
    name:'CourseShowStudents',
    data(){
        return {
            courses: [],
            students:[],
            errorList: '',
            courseId: '',
            model: {
                course: {
                    name: ''
                    
                    
                }
                

            }
           
        }
    },
    mounted(){

        this.courseId = this.$route.params.id;
        this.getCourseStudents(this.$route.params.id)
       // this.getCourses();
       
      
    }, 
    methods: {
        getCourseStudents(courseId){
            axios.get(`http://127.0.0.1:8000/api/courses/${courseId}`).then(res =>{
                
               // this.courses = res.data.courses;
               console.log(res.data);

              // this.model.course = res.data.course ;

              this.students = res.data.course.students;

              this.model.course.name = res.data.course.name;
            //  this.courseId =res.data.course.id;



               

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
        cancelEnrollStudent(theId){

           

            var mythis = this;

           // /courses/{course_id}/cancel/student/{student_id}

            // '/courses/{course_id}/student/{student_id}'
            // put('/courses/{course_id}/instructor/{instructor_id}'
            axios.put(`http://127.0.0.1:8000/api/courses/${this.courseId}/cancel/student/${theId}`,this.model.course)
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