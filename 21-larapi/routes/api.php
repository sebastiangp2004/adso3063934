<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PetController;
use App\Http\Controllers\API\AuthController;

// Rutas públicas
Route::post('login', [AuthController::class, 'login']);
Route::get('/test', function() {
    return ['message' => 'API funciona'];
});

// Rutas protegidas con Sanctum
Route::middleware( 'auth:sanctum')->group(function () {

    // Logout
    Route::post('logout', [AuthController::class, 'logout']);

    // Rutas de Pets protegidas
    Route::get('pets/list', [PetController::class, 'index']);
    Route::get('pets/show/{id}', [PetController::class, 'show']);
    Route::post('pets/store', [PetController::class, 'store']);
    Route::put('pets/edit/{id}', [PetController::class, 'update']);
    Route::delete('pets/delete/{id}', [PetController::class, 'destroy']);

});