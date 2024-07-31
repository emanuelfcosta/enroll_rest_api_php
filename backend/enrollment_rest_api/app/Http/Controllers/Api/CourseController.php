<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Validator;
use App\Models\Instructor;
use App\Models\Student;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('instructor')->get();

        if($courses->count() > 0){
            return response()->Json([
                    'status' => 200,
                    'courses' => $courses

            ], 200);
        } else {
            
                return response()->Json([
                    'status' => 404,
                    'message' => 'No Records Found'

                 ], 404);

        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, int $id)
    {
        $instructor = Instructor::find($id);

        if (!$instructor){
            return response()->json([
                'status' => 404,
                'message' => 'No such Instructor Found!'
            ],404);
        }else{
            $validator = Validator::make($request->all(),[
                'name' => 'required',
            ]);
            if($validator->fails()){
                return response()->json([
                    'status' => 422,
                    'errors'=> $validator->messages()
                ], 422);
            }else{
                $course = Course::create([
                    'name' => $request->name,
                    'instructor_id' => $id
                ]);

                if($course){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Course Create Successfully'
                    ],200);
                }else{
    
                    return response()->json([
                        'status' => 500,
                        'message' => 'Something Went Wrong!'
                    ],500);
    
                }
               
            }

            
        }
     
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //  $courses = Course::with('instructor')->get();
        //$course = Course::find($id);

//         $user = User::with('pages')->find(1);
// foreach($user->pages as $page) {
//     var_dump($page->name);
// }
 

        $course = Course::with('students')->find($id);
        if($course){
            return response()->json([
                'status' => 200,
                'course' => $course
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Course Found!'
            ],404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $course = Course::find($id);
        if($course){
            return response()->json([
                'status' => 200,
                'course' => $course
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Course Found!'
            ],404);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $course_id, int $instructor_id)
    {
        $instructor = Instructor::find($instructor_id);

        if (!$instructor){
            return response()->json([
                'status' => 404,
                'message' => 'No such Instructor Found!'
            ],404);
        }else{
            $course = Course::find($course_id);

             if($course){

                $course->update([
                    'name' => $request->name,
                    'instructor_id' => $instructor_id
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Course Updated Successfully'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Course Found!'
                ],404);

            }

            }
    }

    //Enrollment

    public function enrollment(Request $request, int $course_id, int $student_id)
    {
        
        $student = Student::find($student_id);

        if  (!$student) {
            return response()->json([
                'status' => 404,
                'message' => 'No such  Student Found!'
            ],404);
        }else{
            $course = Course::find($course_id);

             if($course){

               // $course->students()->sync($student);
               $course->students()->attach($student);
                $course->save();

                

                return response()->json([
                    'status' => 200,
                    'message' => 'student successfully enrolled'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Course Found!'
                ],404);

            }

            }
    }

    public function cancel_enrollment(Request $request, int $course_id, int $student_id)
    {
        
        $student = Student::find($student_id);

        if  (!$student) {
            return response()->json([
                'status' => 404,
                'message' => 'No such  Student Found!'
            ],404);
        }else{
            $course = Course::find($course_id);

             if($course){

                $course->students()->detach($student);
                $course->save();


                return response()->json([
                    'status' => 200,
                    'message' => 'the enrollment was canceled successfully'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Course Found!'
                ],404);

            }

            }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::find($id);
        if($course){
            $course->students()->detach();
            $course->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Course Deleted Sucessfully!'
            ],200);

        }else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Course Found!'
            ],404);

        }
    }
}
