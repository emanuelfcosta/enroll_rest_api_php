<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::all();

        if($departments->count() > 0){
            return response()->Json([
                    'status' => 200,
                    'departments' => $departments

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
            'name' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors'=> $validator->messages()
            ], 422);
        }else {
            $department = Department::create([
                'name' => $request->name
            ]);

            if($department){
                return response()->json([
                    'status' => 200,
                    'message' => 'Department Create Successfully'
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
        $department = Department::find($id);
        if($department){
            return response()->json([
                'status' => 200,
                'department' => $department
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Department Found!'
            ],404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $department = Department::find($id);
        if($department){
            return response()->json([
                'status' => 200,
                'department' => $department
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No such Department Found!'
            ],404);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
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
            $department = Department::find($id);
           
            if($department){

                $department->update([
                    'name' => $request->name
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Department Updated Successfully'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Department Found!'
                ],404);

            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $department = Department::find($id);
        if($department){
            $department->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Department Deleted Sucessfully!'
            ],200);

        }else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Department Found!'
            ],404);

        }
    }
}
