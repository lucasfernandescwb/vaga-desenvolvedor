<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        return JobResource::collection(Job::query()->orderBy('id', 'desc')->paginate(20));
    }

    public function store(Request $request)
    {
        $job = Job::create($request->all());
        return response()->json(new JobResource($job));
    }

    public function show($id)
    {
        $job = Job::find($id);
        
        if (!$job) {
            return response()->json([
                'message' => 'Job not found.'
            ], 400);
        }

        return response()->json(new JobResource($job));
    }

    public function update(Request $request, $id)
    {
        $job = Job::find($id);
        
        if (!$job) {
            return response()->json([
                'message' => 'Job not found.'
            ], 400);
        }

        $job->update($request->all());
        return response()->json(new JobResource($job));
    }

    public function destroy($id)
    {
        $job = Job::find($id);
        
        if (!$job) {
            return response()->json([
                'message' => 'Job not found.'
            ], 400);
        }

        $job->delete();
        return response()->json([
            'message' => 'Job deleted successfully!'
        ], 200);
    }
}
