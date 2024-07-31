<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Instructor</h4>
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
                        :value="department.id">
                            {{ department.name}}
                        </option> 
                    </select>

                    <!-- @change="selectDepartment"  -->

                    <!-- <option v-for="(department,index) in this.departments" :key="index" 
                        :value="department.id"></option> -->

                   <!-- value="{ id: department.id, text: department.name }"> -->

                    <!-- <select id="cars" name="cars" class="form-select" >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select> -->
                </div>

               
                
                <div class="mb-3">
                      <button type="button" @click="saveInstructor" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'InstructorCreate',
    data(){
        return {
            departments: [],
            errorList: '',
            departmentId: null,
            
            model: {
                instructor: {
                    name: '',
                    
                }
                

            }
        }
    },
    mounted(){
       
        this.getDepartments();
   
      
    },
    methods: {

    //     selectDepartment() {
    //        // console.log('Selected Option:', value);

    //        console.log('Selected Option:', this.departmentId);


    
    // },

        getDepartments(){
            axios.get('http://127.0.0.1:8000/api/departments').then(res =>{
                
                this.departments = res.data.departments;  
            });
        },

        saveInstructor(){

            var mythis = this;

            

            axios.post(`http://127.0.0.1:8000/api/instructors/department/${this.departmentId}`,this.model.instructor)
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