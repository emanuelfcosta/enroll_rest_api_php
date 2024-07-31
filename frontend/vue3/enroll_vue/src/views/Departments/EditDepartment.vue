<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Departments</h4>
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
                      <button type="button" @click="updateDepartment" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DepartmentEdit',
    data(){
        return {
            departmentId: '',
            errorList: '',
            model: {
                department: {
                    name: '',
                    
                }

            }
        }
    },
    mounted(){
      //  console.log(this.$route.params.id);
      this.departmentId = this.$route.params.id;
      this.getDepartmentData(this.$route.params.id);

    },
    methods: {
        getDepartmentData(departmentId){

        axios.get(`http://127.0.0.1:8000/api/departments/${departmentId}`).then(res => {
                console.log(res.data);

                
                this.model.department = res.data.department ;
               

        })
        .catch(function (error) {
  
            if (error.response) {
                if(error.response.status == 404 ){
                   

                    alert(error.response.data.message);
                }
            
          
            } 

            });

        },

        updateDepartment(){

            var mythis = this;

            axios.put(`http://127.0.0.1:8000/api/departments/${this.departmentId}`,this.model.department)
            .then(res=>{
              console.log(res.data);
              alert(res.data.message);  

             
                this.errorList = '';
            })
            .catch(function (error) {
  
            if (error.response) {
                if(error.response.status == 422 ){

                     mythis.errorList = error.response.data.errors;
                }

                if(error.response.status == 404 ){

                    alert(error.response.data.message);
                    
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