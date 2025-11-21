@extends('layouts.dashboard')

@section('title','Show User: Larapets 🐕‍🦺')

@section('content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-5">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
        </path>
    </svg>
    Show User
</h1>

{{-- Breadcrumbs --}}
<div class="breadcrumbs text-sm text-white">
    <ul>
        <li>
            <a href="{{ url('dashboard') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z">
                    </path>
                </svg>
                Dashboard
            </a>
        </li>
        <li>
            <a href="{{ url('users') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                    </path>
                </svg>
                Users Module
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z">
                    </path>
                </svg>
                Show User
            </span>
        </li>
    </ul>
</div>

{{-- Card --}}

<div class="bg-[#0009] p-10 rounded-sm">
    {{-- Photo --}}
    <div
        class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-105 transition ease-in">
        <div class="mask mask-squircle w-60">
            <img src="{{asset('images/'.$user->photo)}}" />
        </div>
    </div>
    {{-- Data --}}
    <div class="flex gap-2 flex-col md:flex-row">
        <ul class="list bg-[#0009] mt-4 text-[#fffffff6] rounded-box shadow-md w-64">
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Document:</span><span>{{ $user->document }}</span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">FullName:</span><span>{{ $user->fullname }}</span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Gender:</span><span>{{ $user->gender }}</span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Age:</span><span>{{Carbon\Carbon::parse($user->birthdate)->age}} Years Old</span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Phone:</span><span>{{ $user->phone }}</span>
            </li>
        </ul>
        <ul class="list bg-[#0009] mt-4 text-[#fffffff6] rounded-box shadow-md w-64">
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Email:</span><span>{{ $user->email }}</span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Active:</span>
                <span>
                    @if ($user->active == 1)
                    <div class="badge badge-outline badge-success">Active</div>
                    @else
                    <div class="badge badge-outline badge-error">Inactive</div>
                    @endif
                </span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Role:</span>
                <span>
                    @if ($user->role == 'Administrator')
                    <div class="badge badge-outline badge-warning">Admin</div>
                    @else
                    <div class="badge badge-outline badge-default">Customer</div>
                    @endif
                </span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Created At:</span><span>{{ $user->created_at
                    ->DiffForHumans()}}</span>
            </li>
            <li class="list-row">
                <span class="text-[#ffffffe1] font-semibold">Updated At:</span><span>{{ $user->updated_at
                    ->DiffForHumans()}}</span>
            </li>
        </ul>
    </div>
</div>


@endsection