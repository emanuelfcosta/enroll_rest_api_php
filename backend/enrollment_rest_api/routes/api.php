<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\InstructorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//department

//department

Route::get('/departments', [DepartmentController::class, 'index']);
Route::post('/departments', [DepartmentController::class, 'store']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);
Route::get('/departments/edit/{id}', [DepartmentController::class, 'edit']);
Route::put('/departments/{id}', [DepartmentController::class, 'update']);
Route::delete('/departments/{id}', [DepartmentController::class, 'destroy']);

//instructor
Route::get('/instructors', [InstructorController::class, 'index']);
Route::post('/instructors/department/{id}', [InstructorController::class, 'store']);
Route::get('/instructors/{id}', [InstructorController::class, 'show']);
Route::get('/instructors/edit/{id}', [InstructorController::class, 'edit']);
Route::put('/instructors/{instructor_id}/department/{department_id}', [InstructorController::class, 'update']);
Route::delete('/instructors/{id}', [InstructorController::class, 'destroy']);

//course
Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses/instructor/{id}', [CourseController::class, 'store']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::get('/courses/edit/{id}', [CourseController::class, 'edit']);
Route::put('/courses/{course_id}/instructor/{instructor_id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

//enrollment
Route::put('/courses/{course_id}/student/{student_id}', [CourseController::class, 'enrollment']);
Route::put('/courses/{course_id}/cancel/student/{student_id}', [CourseController::class, 'cancel_enrollment']);


// student
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::get('/students/edit/{id}', [StudentController::class, 'edit']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);

