<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // return "This is a entry point  ";
    return view('welcome');
});


Route::get('hello', function () {
    return "<h1>Hello folks, Have a nice day!</h1>";
});

Route::get('hello/{name}', function () {
    return "<h1>Hello ". request()->name .", Have a nice day!</h1>";
});

Route::get('show/pets', function () {
    $pets = \App\Models\Pet::all();
    dd($pets->toArray()); // dump and die
});
Route::get('show/pets/{id}', function ($id) {
    $pet = \App\Models\Pet::find($id);
    dd($pet->toArray()); // buscar por id
});

Route::get('show/users', function () {
    $users = \App\Models\User::all();
    dd($users->toArray());
});


Route::get('challenge', function () {
    $users = \App\Models\User::take(20)->get();
    
    $html = '<table border="1" style="border-collapse: collapse; width: 50%; justify-content: center; margin: auto;">
        <tr style="background-color: #f2f2f2;">
            <th>ID</th>
            <th>Photo</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Created</th>
        </tr>';
    
    foreach ($users as $user) {
        $html .= '<tr>
            <td style="text-align: center;">' . $user->id . '</td>
            <td style="text-align: center;"><img src="' . $user->photo . '" width="100"></td>
            <td style="padding: 10px;">' . $user->fullname . '</td>
            <td style="text-align: center;">' . \Carbon\Carbon::parse($user->birthdate)->age . '</td>
            <td style="padding: 10px;">' . $user->created_at->diffForHumans() . '</td>
        </tr>';
    }
    
    $html .= '</table>';
    
    return $html;
});

Route::get('view/pets', function() {
    $pets = App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});