<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ORM -> Eloquent
        $user = new User;
        $user->document = 75000001;
        $user->fullname = 'Sebastian Grajales Pineda';
        $user->gender = 'Male';
        $user->birthdate = '2004-04-19';
        $user->phone = '3052077923';
        $user->email = 'sebastiangp20044@gmail.com';
        $user->password = bcrypt('admin');
        $user->role = 'Administrador';
        $user->save();


        // Insert -> Array
        DB::table('users')->insert([
            'document' => 75000002,
            'fullname' => 'Milo',
            'gender' => 'Male',
            'birthdate' => '2006-01-28',
            'phone' => '3134520833',
            'email' => 'milo@gmail.com',
            'password' => Hash::make('milo'),
            'created_at' => now()
        ]);
    }
}
