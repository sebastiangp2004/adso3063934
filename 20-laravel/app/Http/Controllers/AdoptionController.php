<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdoptionsExport;

class AdoptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $adopts = Adoption::orderBy('id', 'desc')->paginate(20);
        return view('adoptions.index')->with('adopts', $adopts);
    }

    public function show(Request $request)
    {
        $adopt = Adoption::find($request->id);
        return view('adoptions.show')->with('adopt', $adopt);
    }

    public function search(Request $request)
    {
        $adopts = Adoption::names($request->q)->orderBy('id', 'desc')->paginate(20);
        return view('adoptions.search')->with('adopts', $adopts);
    }

    public function pdf()
    {
        $adopts = Adoption::all();
        $pdf = Pdf::loadView('adoptions.pdf', compact('adopts'));
        return $pdf->download('alladoptions.pdf');
    }

    public function excel()
    {
        return  Excel::download(new AdoptionsExport, 'alladoptions.xlsx');
    }


}
