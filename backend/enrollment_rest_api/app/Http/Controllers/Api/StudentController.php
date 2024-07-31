<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();

        if($students->count() > 0){
            return response()->Json([
                    'status' => 200,
                    'students' => $students

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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors'=> $validator->messages()
            ], 422);
        }else {
            $student = Student::create([
                'name' => $request->name
            ]);

            if($student){
                return response()->json([
                    'status' => 200,
                    'message' => 'Student Create Successfully'
                ],200);
            }else{

                return response()->json([
                    'status' => 500,
                    'message' => 'Something Went Wrong!'
                ],500);

            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$student = Student::find($id);
        $student = Student::with('courses')->find($id);
        if($student){
            return response()->json([
                'status' => 200,
                'student' => $student
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Student Found!'
            ],404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    
        $student = Student::find($id);
        if($student){
            return response()->json([
                'status' => 200,
                'student' => $student
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Student Found!'
            ],404);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors'=> $validator->messages()
            ], 422);
        }else {
            $student = Student::find($id);
           
            if($student){

                $student->update([
                    'name' => $request->name
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Student Updated Successfully'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Student Found!'
                ],404);

            }
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::find($id);
        if($student){
            $student->courses()->detach();
            $student->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Student Deleted Sucessfully!'
            ],200);

        }else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Student Found!'
            ],404);

        }
    }
}
