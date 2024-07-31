<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Departments</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                              {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                      <label for="">Name</label>
                      <input type="text" v-model="model.department.name" class="form-control">
                </div>
               
                
                <div class="mb-3">
                      <button type="button" @click="saveDepartment" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DepartmentCreate',
    data(){
        return {
            errorList: '',
            model: {
                department: {
                    name: '',
                    
                }

            }
        }
    },
    methods: {

        saveDepartment(){

            var mythis = this;

            axios.post('http://127.0.0.1:8000/api/departments',this.model.department)
            .then(res=>{
              console.log(res.data);
              alert(res.data.message);  

              this.model.department = {
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