

@extends('layouts.dashboard')
@section('title', 'Dashboard ADMIN: Larapets 🐕‍🦺')
@section('content')

<div class="text-white bg-center bg-cover bg-fixed w-full flex flex-col gap-4 items-center justify-center ">
    <h1>Dashboard</h1>
<h2>{{ Auth::user()->fullname }}</h2>
<h3>You're logged in!</h3>

</div>
@endsection