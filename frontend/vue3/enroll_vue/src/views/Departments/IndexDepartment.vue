import { RouterLink } from 'vue-router';

<template>
 <div class="container">
        <div class="card">
            <div class="card-reader">
                <h4>Departments
                    <RouterLink to="/departments/create" class="btn btn-primary float-end">
                        Add Department
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
                    <tbody v-if="this.departments.length > 0" >
                        <tr v-for="(department,index) in this.departments" :key="index" >
                            <td>{{ department.id }}</td>
                            <td>{{ department.name }}</td>    
                            <td>
                                <RouterLink :to="{path: '/departments/edit/' + department.id }" class="btn btn-success ">
                                    Edit
                                </RouterLink>
                                <button type="button" @click="deleteDepartment(department.id)" class="btn btn-danger ">
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
    name:'departments',
    data(){
        return {
            departments: []
        }
    },
    mounted(){
        this.getDepartments();
        
    
      
    }, 
    methods: {
        getDepartments(){
            axios.get('http://127.0.0.1:8000/api/departments').then(res =>{
                
                this.departments = res.data.departments;  
            });
        },

        deleteDepartment(departmentId){

            

            if(confirm('are you sure do you wanto to delete this record?')){

                

              axios.delete(`http://127.0.0.1:8000/api/departments/${departmentId}`).then(res => {

                alert(res.data.message);
                this.getDepartments();
             });

            }

        },

  
    },
  }
  </script>