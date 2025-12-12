<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pets = Pet::all();
        if ($pets->isEmpty()) {
            return response()->json(['message' => 'No pets found'], 404);
        } else {
            return response()->json(['message' => 'successful Query 🐶', 'pets' => $pets], 200);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            $request->validate([
                'name'          => ['required', 'string', 'max:255'],
                'kind'          => ['required'],
                'weight'        => ['required', 'numeric'],
                'age'           => ['required'],
                'breed'         => ['required'],
                'location'      => ['required'],
                'description'   => ['required']
            ]);

            $pet = Pet::create($request->all());
            return response()->json(['message' => 'Pet created successfully 🐾', 'pet' => $pet], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error in the request',
                'errors' => $e->errors()
            ], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $pet = Pet::find($request->id);
        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        } else {
            return response()->json(['message' => 'successful Query 🐕', 'pet' => $pet], 200);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $pet = Pet::find($request->id);
        $request->validate([
            'name'          => ['sometimes', 'string', 'max:255'],
            'kind'          => ['sometimes'],
            'weight'        => ['sometimes', 'numeric'],
            'age'           => ['sometimes'],
            'breed'         => ['sometimes'],
            'location'      => ['sometimes'],
            'description'   => ['sometimes']
        ]);
        if ($pet) {
            $pet->update($request->all());
            return response()->json(['message' => 'Pet updated successfully 🐾', 'pet' => $pet], 200);
        } else {
            return response()->json(['message' => 'Pet not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $pet = Pet::find($request->id);
        if ($pet) {
            if ($pet->delete()) {
                return response()->json(['message' => 'Pet deleted successfully 🐾', 'Pet' => $pet], 200);
            }
        } else {
            return response()->json(['message' => 'Pet not found'], 404);
        }
    }
}
