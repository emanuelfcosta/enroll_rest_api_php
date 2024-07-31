 import  axios from "axios";
 
 const REST_API_BASE_URL = 'http://127.0.0.1:8000/api/instructors';

 export const listInstructors = () =>  axios.get(REST_API_BASE_URL);

 //export const createInstructor = (instructor) => axios.post(REST_API_BASE_URL + '/department/4', instructor);

 export const createInstructor = (instructor) => axios.post(REST_API_BASE_URL + '/department/' + instructor.departmentId, instructor);

 export const getInstructor = (instructorId) => axios.get(REST_API_BASE_URL + '/' + instructorId);
 
 
 //export const updateInstructor = (instructorId, instructor) => axios.put(REST_API_BASE_URL + '/' + instructorId + '/department/4', instructor);

 export const updateInstructor = (instructorId, instructor) => axios.put(REST_API_BASE_URL + '/' + instructorId + '/department/' + instructor.departmentId, instructor);

 export const deleteInstructor = (instructorId) => axios.delete(REST_API_BASE_URL + '/' + instructorId);