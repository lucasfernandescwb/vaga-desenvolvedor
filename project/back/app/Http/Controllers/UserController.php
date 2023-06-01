<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserJobResource;
use App\Http\Resources\UserResource;
use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function jobs($id)
    {
        $user = User::findOrFail($id);
        $jobs = $user->jobs;

        return response()->json(UserJobResource::collection($jobs));
    }

    public function subscribe(Request $request, $userId, $jobId)
    {
        $user = User::find($userId);
        $job = Job::find($jobId);

        if (!$user || !$job) {
            return response()->json([
                'message' => 'User or Job not found.'
            ], 400);
        }

        $user->jobs()->attach($job);

        return response()->json(['message' => 'User subscribed successfully!']);
    }

    public function unsubscribe(Request $request, $userId, $jobId)
    {
        $user = User::find($userId);
        $job = Job::find($jobId);

        if (!$user || !$job) {
            return response()->json([
                'message' => 'User or Job not found.'
            ], 400);
        }

        $user->jobs()->detach($job);

        return response()->json(['message' => 'Subscription canceled successfully!']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(20)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return response()->json(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 400);
        }

        return response()->json(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        if(isset($data['passsword'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User successfully deleted!'
        ]);
    }
}
