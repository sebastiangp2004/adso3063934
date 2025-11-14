@extends('layouts.dashboard')
@section('title', 'Dashboard ADMIN: Larapets 🐕‍🦺')
@section('content')


<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-10">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z">
        </path>
    </svg>
    Dashboard

</h1>
{{-- CARDS --}}
<div class="flex flex-wrap gap-6 justify-center">
    {{-- Module Users --}}
    <div class="card bg-[#fffb] w-96 shadow-sm">
        <figure>
            <img src="{{ asset('images/info_users.png') }}" alt="" />
        </figure>
        <div class="card-body ">
            <h2 class="card-title">Module Users</h2>
            {{-- Stats --}}
            <ul class="list bg-[#fff6] rounded-box shadow-md ">

                <li class="p-4 pb-2 text-xs tracking-wide">Statistics:</li>

                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Total Users</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\User::count() }}
                    </button>
                </li>
                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M96.26,37A8,8,0,0,1,102,27.29a104.11,104.11,0,0,1,52,0,8,8,0,0,1-2,15.75,8.15,8.15,0,0,1-2-.26,88,88,0,0,0-44,0A8,8,0,0,1,96.26,37ZM33.35,110a8,8,0,0,0,9.85-5.57,87.88,87.88,0,0,1,22-38.09A8,8,0,0,0,53.8,55.14a103.92,103.92,0,0,0-26,45A8,8,0,0,0,33.35,110ZM150,213.22a88,88,0,0,1-44,0,8,8,0,0,0-4,15.49,104.11,104.11,0,0,0,52,0,8,8,0,0,0-4-15.49Zm62.8-108.77a8,8,0,0,0,15.42-4.28,104,104,0,0,0-26-45,8,8,0,1,0-11.41,11.21A88.14,88.14,0,0,1,212.79,104.45Zm15.44,51.39a103.68,103.68,0,0,1-30.68,49.47A8,8,0,0,1,185.07,203a64,64,0,0,0-114.14,0,8,8,0,0,1-12.48,2.32,103.74,103.74,0,0,1-30.68-49.49,8,8,0,0,1,15.42-4.27,87.58,87.58,0,0,0,19,34.88,79.57,79.57,0,0,1,36.1-28.77,48,48,0,1,1,59.38,0,79.57,79.57,0,0,1,36.1,28.77,87.58,87.58,0,0,0,19-34.88,8,8,0,1,1,15.42,4.28ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Customers</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\User::where('role','customer')->count() }}
                    </button>
                </li>
                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M221.35,104.11a8,8,0,0,0-6.57,9.21A88.85,88.85,0,0,1,216,128a87.62,87.62,0,0,1-22.24,58.41,79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75A88,88,0,0,1,128,40a88.76,88.76,0,0,1,14.68,1.22,8,8,0,0,0,2.64-15.78,103.92,103.92,0,1,0,85.24,85.24A8,8,0,0,0,221.35,104.11ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM237.66,45.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L200,60.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Active Users</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\User::where('active','1')->count() }}
                    </button>
                </li>
            </ul>
            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#0006] hover:text-white mt-4 " href="{{ url('users') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM190.23,190.23a88,88,0,1,1,0-124.46A88.11,88.11,0,0,1,190.23,190.23Zm-64.57-67.89a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L108.69,128,82.34,101.66A8,8,0,0,1,93.66,90.34Zm56,0a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L164.69,128l-26.35-26.34a8,8,0,0,1,11.32-11.32Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    {{-- Module Pets --}}
    <div class="card bg-[#fffb] w-96 shadow-sm">
        <figure>
            <img src="{{ asset('images/info_pets.png') }}" alt="Shoes" />
        </figure>
        <div class="card-body ">
            <h2 class="card-title">Module Pets</h2>
            {{-- Stats --}}
            <ul class="list bg-[#fff6] rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs tracking-wide">Statistics:</li>

                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Total Pets</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\Pet::count() }}
                    </button>
                </li>
                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.92,56h40.15L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Dogs</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\Pet::where('kind','dog')->count() }}
                    </button>
                </li>
                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M96,140a12,12,0,1,1-12-12A12,12,0,0,1,96,140Zm76-12a12,12,0,1,0,12,12A12,12,0,0,0,172,128Zm60-80v88c0,52.93-46.65,96-104,96S24,188.93,24,136V48A16,16,0,0,1,51.31,36.69c.14.14.26.27.38.41L69,57a111.22,111.22,0,0,1,118.1,0L204.31,37.1c.12-.14.24-.27.38-.41A16,16,0,0,1,232,48Zm-16,0-21.56,24.8A8,8,0,0,1,183.63,74,88.86,88.86,0,0,0,168,64.75V88a8,8,0,1,1-16,0V59.05a97.43,97.43,0,0,0-16-2.72V88a8,8,0,1,1-16,0V56.33a97.43,97.43,0,0,0-16,2.72V88a8,8,0,1,1-16,0V64.75A88.86,88.86,0,0,0,72.37,74a8,8,0,0,1-10.81-1.17L40,48v88c0,41.66,35.21,76,80,79.67V195.31l-13.66-13.66a8,8,0,0,1,11.32-11.31L128,180.68l10.34-10.34a8,8,0,0,1,11.32,11.31L136,195.31v20.36c44.79-3.69,80-38,80-79.67Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Cats</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\Pet::where('kind','cat')->count() }}
                    </button>
                </li>
            </ul>
            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#0006] hover:text-white mt-4 " href="{{ url('pets') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM190.23,190.23a88,88,0,1,1,0-124.46A88.11,88.11,0,0,1,190.23,190.23Zm-64.57-67.89a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L108.69,128,82.34,101.66A8,8,0,0,1,93.66,90.34Zm56,0a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L164.69,128l-26.35-26.34a8,8,0,0,1,11.32-11.32Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    {{-- --}}
    <div class="card bg-[#fffb] w-96 shadow-sm">
        <figure>
            <img src="{{ asset('images/info_adopt.png') }}" alt="Shoes" />
        </figure>
        <div class="card-body ">
            <h2 class="card-title">Module Adoptions</h2>
            {{-- Stats --}}
            <ul class="list bg-[#fff6] rounded-box shadow-md">

                <li class="p-4 pb-2 text-xs tracking-wide">Statistics:</li>

                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Total Adoptions</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\Adoption::count() }}
                    </button>
                </li>
                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Dog Adopteds</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\Pet::where('status','1')->where('kind','dog')->count() }}
                    </button>
                </li>
                <li class="list-row">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <div class="text-xs uppercase font-semibold mt-3">Cat Adopteds</div>
                    </div>
                    <button class="btn btn-square btn-ghost rounded-box">
                        {{ App\Models\Pet::where('status','1')->where('kind','cat')->count() }}
                    </button>
                </li>
            </ul>
            <div class="card-actions justify-end">
                <a class="btn btn-outline hover:bg-[#0006] hover:text-white mt-4 " href="{{ url('adoptions') }}">
                    Enter
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM190.23,190.23a88,88,0,1,1,0-124.46A88.11,88.11,0,0,1,190.23,190.23Zm-64.57-67.89a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L108.69,128,82.34,101.66A8,8,0,0,1,93.66,90.34Zm56,0a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L164.69,128l-26.35-26.34a8,8,0,0,1,11.32-11.32Z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>


@endsection