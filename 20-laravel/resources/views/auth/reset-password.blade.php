{{-- <x-guest-layout>
    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email"
                :value="old('email', $request->email)" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password"
                name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Reset Password') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}
@extends('layouts.home')

@section('title', 'Password reset: Larapets 🐒')

@section('content')
<section class="bg-[#0006] text-white rounded-lg md:w-[640px] w-[360px] p-8 flex flex-col gap-4 items-center justify-center">
    <h1 class="text-center flex gap-6 justify-center items-center text-4xl border-b-1 border-white p-2 w-full">Reset password
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path></svg>    </h1>
    <div class="card w-full max-w-sm">
        <p>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
            <form method="POST" action="{{ route('password.store') }}" class="card-body ">
                @csrf
                <input type="hidden" name="token" value="{{ $request->route('token') }}">
                <label class="label text-white">Email</label>
                <input type="text" class="input bg-[#0006] w-full" name="email" placeholder="Enter your Email" value="{{old('email', $request->email)}}" />
                @error('email')
                    <small class="badge badge-outline badge-error w-full h-full">{{ $message }}</small>
                @enderror
                <label class="label text-white">Password</label>
                <input type="password" class="input bg-[#0006] w-full" name="password" placeholder="Passord" />
                @error('password')
                    <small class="badge badge-outline badge-error w-full h-full">{{ $message }}</small>
                @enderror
                <label class="label text-white">Password confirm</label>
                <input type="password" class="input bg-[#0006] w-full" name="password_confirmation" placeholder="Password confirmation" />
                @error('password_confirmation')
                    <small class="badge badge-outline badge-error w-full h-full">{{ $message }}</small>
                @enderror

                <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4 w-full">Reset password</button>
            </form>
        </div>
    </section>
@endsection