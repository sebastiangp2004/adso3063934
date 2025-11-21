@extends('layouts.dashboard')

@section('title', 'Update User: Larapets🐕‍🦺')

@section('content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-5">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z">
        </path>
    </svg>
    Update User
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
                        d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z">
                    </path>
                </svg>
                Update User
            </span>
        </li>
    </ul>
</div>

{{-- Form --}}
<div class="card text-white md:w-[720px] w-[320px] border border-white p-[20px]">
    <form method="POST" action="{{ url('users/' . $user->id) }}" class="flex flex-col md:flex-row gap-4 mt-4"
        enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="w-full md:w-[320px]">
            <div
                class="avatar flex flex-col gap-1 cursor-pointer items-center justify-center hover:scale-105 transition ease-in ">
                <div id="upload" class="mask mask-squircle w-48 bg-[#fff]">
                    <img id="preview" src="{{asset('images/'.$user->photo)}}" />
                </div>
                <small class="border-b border-white flex gap-1 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224ZM157.66,106.34a8,8,0,0,1-11.32,11.32L136,107.31V152a8,8,0,0,1-16,0V107.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z">
                        </path>
                    </svg>
                    Upload Photo
                </small>
                @error('photo')
                <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
                @enderror
            </div>
            <input type="file" name="photo" id="photo" class="hidden" accept="image/*" >
            <input type="hidden" name="originphoto" value="{{ $user->photo }}">
        </div>

        <div class=" w-full md:w-[320px]">
            {{-- Document --}}
            <label class="label text-white">Document</label>
            <input type="number" class="input bg-[#0009]" name="document" placeholder="123456789"
                value="{{ $user->document }}" />
            @error('document')
            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
            @enderror

            {{-- Fullname --}}
            <label class="label text-white">Full Name</label>
            <input type="text" class="input bg-[#0009]" name="fullname" placeholder="Jeremias Springfield"
                value="{{ $user->fullname }}" />
            @error('fullname')
            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
            @enderror

            {{-- Gender --}}
            <label class="label text-white">Gender</label>
            <select name="gender" class="select bg-[#0009] outline-0">
                <option value="">Select...</option>
                <option value="Female" @if ($user->gender=='Female' ) selected @endif>Female</option>
                <option value="Male" @if ($user->gender=='Male' ) selected @endif>Male</option>
            </select>
            @error('gender')
            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
            @enderror

           
        </div>

        <div class="w-full md:w-[320px]">
             {{-- Birthdate --}}
            <label class="label text-white">Birthdate</label>
            <input type="date" class="input bg-[#0009]" name="birthdate" placeholder="1983-06-16"
                value="{{ $user->birthdate }}" />
            @error('birthdate')
            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
            @enderror
            {{-- phone --}}
            <label class="label text-white">Phone</label>
            <input type="number" class="input bg-[#0009]" name="phone" placeholder="3204456321"
                value="{{ $user->phone }}" />
            @error('phone')
            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
            @enderror

            <label class="label text-white">Email</label>
            <input type="text" class="input bg-[#0009]" name="email" placeholder="Email" value="{{ $user->email }}" />
            @error('email')
            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
            @enderror

            <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4 w-full">Update</button>
        </div>
    </form>
</div>

@endsection

@section('js')
<script>
    $(document).ready(function(){
        $('#upload').click(function(e){
            e.preventDefault()
            $('#photo').click()
        })
        $('#photo').change(function(e){
           e.preventDefault()
           $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]));
        })
    })
</script>
@endsection