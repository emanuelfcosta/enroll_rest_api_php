<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Student</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                              {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                      <label for="">Name</label>
                      <input type="text" v-model="model.student.name" class="form-control">
                </div>
               
                
                <div class="mb-3">
                      <button type="button" @click="saveStudent" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StudentCreate',
    data(){
        return {
            errorList: '',
            model: {
                student: {
                    name: '',
                    
                }

            }
        }
    },
    methods: {

        saveStudent(){

            var mythis = this;

            axios.post('http://127.0.0.1:8000/api/students',this.model.student)
            .then(res=>{
              console.log(res.data);
              alert(res.data.message);  

              this.model.student = {
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