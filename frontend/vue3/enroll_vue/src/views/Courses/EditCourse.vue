<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Course</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                              {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                      <label for="">Name</label>
                      <input type="text" v-model="model.course.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Instructor</label>
                    <select 
                       class="form-select" v-model="instructorId" >
                        <option v-for="(instructor,index) in this.instructors" :key="index" 
                        :value="instructor.id" :selected="model.course.instructor_id === instructor.id   " >
                            {{ instructor.name}}
                        </option> 
                    </select>

                </div>
                

               
                
                <div class="mb-3">
                      <button type="button" @click="updateCourse" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'CourseEdit',
    data(){
        return {
            instructors: [],
            errorList: '',
            courseId: '',
            instructorId: null,
            
            model: {
                course: {
                    name: '',
                    instructor_id: ''
                    
                }
                

            }
        }
    },
    mounted(){

        this.courseId = this.$route.params.id;

       
        this.getInstructors();
        this.getCourseData(this.$route.params.id);
   
      
    },
    methods: {

    getCourseData(courseId){

        axios.get(`http://127.0.0.1:8000/api/courses/${courseId}`).then(res => {
                console.log(res.data);

                
                this.model.course = res.data.course ;
               

        })
        .catch(function (error) {
  
            if (error.response) {
                if(error.response.status == 404 ){
                   

                    alert(error.response.data.message);
                }
            
          
            } 

            });

        },


        getInstructors(){
            axios.get('http://127.0.0.1:8000/api/instructors').then(res =>{
                
                this.instructors = res.data.instructors;  
            });
        },

        updateCourse(){

            var mythis = this;

            
           // put('/courses/{course_id}/instructor/{instructor_id}'
            axios.put(`http://127.0.0.1:8000/api/courses/${this.courseId}/instructor/${this.instructorId}`,this.model.course)
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