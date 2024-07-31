import axios from "axios"; 

const COURSE_REST_API_BASE_URL = 'http://127.0.0.1:8000/api/courses';

export const getAllCourses = () =>  axios.get(COURSE_REST_API_BASE_URL);

//export const createCourse = (course) => axios.post(COURSE_REST_API_BASE_URL + '/instructor/1',course);

export const createCourse = (course) => axios.post(COURSE_REST_API_BASE_URL + '/instructor/' + course.instructorId,course);

export const getCourseById = (courseId) => axios.get(COURSE_REST_API_BASE_URL + '/' + courseId);

export const updateCourse = (courseId, course) => axios.put(COURSE_REST_API_BASE_URL + '/' + courseId + '/instructor/' + course.instructorId, course );

export const deleteCourse = (courseId) => axios.delete(COURSE_REST_API_BASE_URL + '/' + courseId);

//enroll student
//subscribe student
export const enrollStudent = (enroll) => axios.put(COURSE_REST_API_BASE_URL + '/' + enroll.courseId + '/student/' + enroll.studentId );
// unsubscribe student
// /courses/{course_id}/cancel/student/{student_id}
export const unsubscribe = (courseId, studentId) => axios.put(COURSE_REST_API_BASE_URL + '/' + courseId + '/cancel/student/' + studentId );
