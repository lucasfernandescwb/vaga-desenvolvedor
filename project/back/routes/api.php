<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('users', UserController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy'])
        ->names([
            'index' => 'users.index',
            'show' => 'users.show',
            'store' => 'users.store',
            'update' => 'users.update',
            'destroy' => 'users.destroy',
        ]);

    Route::get('users/{user}/jobs', [UserController::class, 'jobs'])
        ->name('users.jobs');

    Route::post('users/{user}/jobs/{job}/subscribe', [UserController::class, 'subscribe'])
        ->name('users.jobs.subscribe');

    Route::delete('users/{user}/jobs/{job}/unsubscribe', [UserController::class, 'unsubscribe'])
        ->name('users.jobs.unsubscribe');

    Route::apiResource('jobs', JobController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names([
            'index' => 'jobs.index',
            'store' => 'jobs.store',
            'update' => 'jobs.update',
            'destroy' => 'jobs.destroy',
        ]);
});

Route::get('all-jobs', [JobController::class, 'index']);
Route::get('jobs/{job}', [JobController::class, 'show']);

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
