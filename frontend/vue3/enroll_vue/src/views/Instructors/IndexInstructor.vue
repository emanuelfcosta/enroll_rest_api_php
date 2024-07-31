import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                <h4>Instructors
                    <RouterLink to="/instructors/create" class="btn btn-primary float-end">
                        Add Instructor
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Actions</th>
                          
                            
                        </tr>

                    </thead>
                    <tbody v-if="this.instructors.length > 0" >
                        <tr v-for="(instructor,index) in this.instructors" :key="index" >
                            <td>{{ instructor.id }}</td>
                            <td>{{ instructor.name }}</td>   
                            <td>{{ instructor.department.name }}</td>   
                            <td>
                                <RouterLink :to="{path: '/instructors/edit/' + instructor.id }" class="btn btn-success ">
                                    Edit
                                </RouterLink>
                                <button type="button" @click="deleteInstructor(instructor.id)" class="btn btn-danger ">
                                    Delete
                                </button>

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
    name:'instructors',
    data(){
        return {
            instructors: []
           
        }
    },
    mounted(){
        this.getInstructors();
       
      
    }, 
    methods: {
        getInstructors(){
            axios.get('http://127.0.0.1:8000/api/instructors').then(res =>{
                
                this.instructors = res.data.instructors;

               

            });
        },
       

        deleteInstructor(instructorId){

            

            if(confirm('are you sure do you wanto to delete this record?')){

                

              axios.delete(`http://127.0.0.1:8000/api/instructors/${instructorId}`).then(res => {

                alert(res.data.message);
                this.getInstructors();
             });

            }

        },

  
    },
  }
  </script>