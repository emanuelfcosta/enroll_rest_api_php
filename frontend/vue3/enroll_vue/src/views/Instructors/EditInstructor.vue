<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Instructor</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                              {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                      <label for="">Name</label>
                      <input type="text" v-model="model.instructor.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Department</label>
                    <select 
                       class="form-select" v-model="departmentId" >
                        <option v-for="(department,index) in this.departments" :key="index" 
                        :value="department.id" :selected="model.instructor.department_id === department.id   " >
                            {{ department.name}}
                        </option> 
                    </select>

                </div>
                

               
                
                <div class="mb-3">
                      <button type="button" @click="updateInstructor" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'InstructorEdit',
    data(){
        return {
            departments: [],
            errorList: '',
            instructorId: '',
            departmentId: null,
            
            model: {
                instructor: {
                    name: '',
                    department_id: ''
                    
                }
                

            }
        }
    },
    mounted(){

        this.instructorId = this.$route.params.id;

       
        this.getDepartments();
        this.getInstructorData(this.$route.params.id);
   
      
    },
    methods: {

    getInstructorData(instructorId){

        axios.get(`http://127.0.0.1:8000/api/instructors/${instructorId}`).then(res => {
                console.log(res.data);

                
                this.model.instructor = res.data.instructor ;
               

        })
        .catch(function (error) {
  
            if (error.response) {
                if(error.response.status == 404 ){
                   

                    alert(error.response.data.message);
                }
            
          
            } 

            });

        },


        getDepartments(){
            axios.get('http://127.0.0.1:8000/api/departments').then(res =>{
                
                this.departments = res.data.departments;  
            });
        },

        updateInstructor(){

            var mythis = this;

            
           // /instructors/{instructor_id}/department/{department_id}'
            axios.put(`http://127.0.0.1:8000/api/instructors/${this.instructorId}/department/${this.departmentId}`,this.model.instructor)
            .then(res=>{
              console.log(res.data);
              alert(res.data.message);  

              this.model.instructor = {
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