import axios from "axios"; 

const DEPARTMENT_REST_API_BASE_URL = 'http://127.0.0.1:8000/api/departments';

export const getAllDepartments = () =>  axios.get(DEPARTMENT_REST_API_BASE_URL);

export const createDepartment = (department) => axios.post(DEPARTMENT_REST_API_BASE_URL,department);

export const getDepartmentById = (departmentId) => axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId);

export const updateDepartment = (departmentId, department) => axios.put(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId, department );

export const deleteDepartment = (departmentId) => axios.delete(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId);