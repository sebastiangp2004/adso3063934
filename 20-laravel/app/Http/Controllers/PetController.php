<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PetsExport;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $users = User::all();
        // $users = User::paginate(20);
        $pets = Pet::orderBy('id', 'desc')->paginate(15);
        // dd($users->toArray());
        return view('pets.index')->with('pets', $pets);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        return view('pets.show')->with('pet', $pet);
    }

    public function search(Request $request)
    {

        $pets = Pet::names($request->q)->orderBy('id', 'desc')->paginate(20);
        return view('pets.search')->with('pets', $pets);
    }

    public function edit(Pet $pet)
    {
        return view('pets.edit')->with('pet', $pet);
    }

    public function update(Request $request, Pet $pet)
    {
        // dd($request->all());
        $validation = $request->validate([
            'weight'        => ['required', 'numeric'],
            'name'          => ['required', 'string', 'max:255'],
            'kind'          => ['required'],
            'age'           => ['required'],
            'breed'         => ['required'],
            'location'      => ['required'],
        ]);
        if ($validation) {
            // dd($request->all());
            if ($request->hasFile('image')) {
                $image = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $image);
                if ($request->originImage != 'no-image.png') {
                    unlink(public_path('images/') . $request->originImage);
                }
            } else {
                $image = $request->originImage;
            }
        }

        $pet->weight            = $request->weight;
        $pet->name              = $request->name;
        $pet->kind              = $request->kind;
        $pet->age               = $request->age;
        $pet->breed             = $request->breed;
        $pet->location          = $request->location;
        $pet->image             = $image;
        if ($pet->save()) {
            return redirect('pets')->with('success', value: 'The pet: ' . $pet->name . ' has been updated successfully.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        if ($pet->image != 'no-image.png') {
            unlink(public_path('images/') . $pet->image);
        }
        if ($pet->delete()) {
            return redirect('pets')->with('success', value: 'The pet: ' . $pet->name . ' was successfully deleted.');
        }
    }

    public function create()
    {
        return view('pets.create');
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validation = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'kind'          => ['required'],
            'weight'        => ['required'],
            'age'           => ['required'],
            'image'         => ['required', 'image'],
            'breed'         => ['required'],
            'location'      => ['required'],
            'description'   => ['required'],
        ]);
        if ($validation) {
            //    dd($request->all());
            if ($request->hasFile('image')) {
                $image = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $image);
            }
        }
        $pet = new Pet;
        $pet->name         = $request->name;
        $pet->kind         = $request->kind;
        $pet->weight       = $request->weight;
        $pet->age          = $request->age;
        $pet->image        = $image;
        $pet->breed        = $request->breed;
        $pet->location     = $request->location;
        $pet->description  = $request->description;
        if ($pet->save()) {
            return redirect('pets')->with('success', value: 'The pet: ' . $pet->name . ' has been created successfully.');
        }
    }



    public function pdf()
    {
        $pets = Pet::all();
        $pdf = Pdf::loadView('pets.pdf', compact('pets'));
        return $pdf->download('allpets.pdf');
    }

    public function excel()
    {
        return  Excel::download(new PetsExport, 'allpets.xlsx');
    }
}
