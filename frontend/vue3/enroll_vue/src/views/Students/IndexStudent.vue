import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                <h4>Students
                    <RouterLink to="/students/create" class="btn btn-primary float-end">
                        Add Student
                    </RouterLink>

                  
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
                                <RouterLink :to="{path: '/students/edit/' + student.id }" class="btn btn-success ">
                                    Edit
                                </RouterLink>
                                 <button type="button" @click="deleteStudent(student.id)" class="btn btn-danger ">
                                    Delete
                                </button>
                                
                                <RouterLink :to="{path: '/students/courses/show/' + student.id }" class="btn btn-warning ">
                                    Courses
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
    name:'students',
    data(){
        return {
            students: []
           
        }
    },
    mounted(){
        this.getStudents();
       
      
    }, 
    methods: {
        getStudents(){
            axios.get('http://127.0.0.1:8000/api/students').then(res =>{

                console.log(res.data);
                
                this.students = res.data.students;

               

            });
        },
       

        deleteStudent(studentId){

            

            if(confirm('are you sure do you wanto to delete this record?')){

                

              axios.delete(`http://127.0.0.1:8000/api/students/${studentId}`).then(res => {

                alert(res.data.message);
                this.getStudents();
             });

            }

        },

  
    },
  }
  </script>