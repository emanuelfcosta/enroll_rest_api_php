import axios from "axios"; 

const STUDENT_REST_API_BASE_URL = 'http://127.0.0.1:8000/api/students';

export const getAllStudents = () =>  axios.get(STUDENT_REST_API_BASE_URL);

export const createStudent = (student) => axios.post(STUDENT_REST_API_BASE_URL ,student);

export const getStudentById = (studentId) => axios.get(STUDENT_REST_API_BASE_URL + '/' + studentId);

export const updateStudent = (studentId, student) => axios.put(STUDENT_REST_API_BASE_URL + '/' + studentId , student );

export const deleteStudent = (studentId) => axios.delete(STUDENT_REST_API_BASE_URL + '/' + studentId);
