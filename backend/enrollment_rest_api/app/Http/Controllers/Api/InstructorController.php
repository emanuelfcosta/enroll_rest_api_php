<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Instructor;
use App\Models\Department;
use Illuminate\Support\Facades\Validator;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$instructors = Instructor::all();
        $instructors = Instructor::with('department')->get();

        if($instructors->count() > 0){
            return response()->Json([
                    'status' => 200,
                    'instructors' => $instructors

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
    public function store(Request $request, int $department_id)
    {
        $department = Department::find($department_id);

        if (!$department){
            return response()->json([
                'status' => 404,
                'message' => 'No such Department Found!'
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
                $instructor = Instructor::create([
                    'name' => $request->name,
                    'department_id' => $department_id
                ]);

                if($instructor){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Instructor Create Successfully'
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
        $instructor = Instructor::find($id);
        if($instructor){
            return response()->json([
                'status' => 200,
                'instructor' => $instructor
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Instructor Found!'
            ],404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $instructor = Instructor::find($id);
        if($instructor){
            return response()->json([
                'status' => 200,
                'instructor' => $instructor
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Instructor Found!'
            ],404);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $instructor_id, int $department_id)
    {
        $department = Department::find($department_id);

        if (!$department){
            return response()->json([
                'status' => 404,
                'message' => 'No such Department Found!'
            ],404);
        }else{
            $instructor = Instructor::find($instructor_id);

             if($instructor){

                $instructor->update([
                    'name' => $request->name,
                    'department_id' => $department_id
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Instructor Updated Successfully'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Instructor Found!'
                ],404);

            }

            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $instructor = Instructor::find($id);
        if($instructor){
            $instructor->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Instructor Deleted Sucessfully!'
            ],200);

        }else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Instructor Found!'
            ],404);

        }
    }
}
