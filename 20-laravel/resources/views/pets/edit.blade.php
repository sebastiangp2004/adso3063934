@extends('layouts.dashboard')
@section('title', 'Edit Pets: Larapets 🐒')

@section('content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-white">Edit Pet
    <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z">
        </path>
    </svg>
</h1>

{{-- breadcrums --}}
<div class="breadcrumbs text-sm flex justify-center text-white">
    <ul>
        <li>
            <a href="{{ url('dashboard') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="white" viewBox="0 0 256 256">
                    <path
                        d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z">
                    </path>
                </svg>
                Dashboard
            </a>
        </li>
        <li>
            <a href="{{ url('pets') }}">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="white" viewBox="0 0 256 256">
                    <path
                        d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
                    </path>
                </svg>
                Module Pet
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z">
                    </path>
                </svg> Edit Pet
            </span>
        </li>
    </ul>
</div>
{{-- Form --}}
<div class="card text-white md:w-[720px] w-[320px] p-[20px]">
    <form method="POST" action="{{ url('pets/'.$pet->id) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="flex flex-col md:flex-row gap-4 mt-4">
            <div class="w-full md:w-[320px]">
                <div
                    class="avatar flex flex-col gap-2 cursor-pointer justify-center items-center hover:scale-110 transition ease-in">
                    <div id="upload" class="mask mask-squircle w-48 bg-white">
                        <img id="preview" src="{{asset('images/'. $pet->image)}}" />
                    </div>
                    <small class="pb-0 border-white border-b flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40ZM90.34,109.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,91.31V152a8,8,0,0,1-16,0V91.31l-18.34,18.35A8,8,0,0,1,90.34,109.66Z">
                            </path>
                        </svg>
                        Upload Image
                    </small>
                    @error('image') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                    @enderror

                </div>
                <input type="file" id="image" name="image" class="hidden" accept="images/*">
                <input type="hidden" name="originImage" value="{{ $pet->image }}">
            </div>

            <div class="w-full md:w-[320px]">
                <label class="label text-white">Name</label>
                <input type="text" class="input bg-[#0006]" name="name" placeholder="1054123123"
                    value="{{ $pet->name }}" />
                @error('name') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                @enderror

                <label class="label text-white">Kind</label>
                <input type="text" class="input bg-[#0006]" name="kind" placeholder="Dog"
                    value="{{ $pet->kind }}" />
                @error('kind') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                @enderror

                 <label class="label text-white">Weight</label>
                <input type="text" class="input bg-[#0006]" name="weight" placeholder="Weight in kg"
                    value="{{ $pet->weight }}" />
                @error('weight') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                @enderror
            </div>

            <div class="w-full md:w-[320px]">
                <label class="label text-white">Location</label>
                <input type="text" class="input bg-[#0006]" name="location" placeholder="New york"
                    value="{{ $pet->location }}" />
                @error('location') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                @enderror

                <label class="label text-white">Breed</label>
                <input type="text" class="input bg-[#0006]" name="breed" placeholder="Breed"
                    value="{{ $pet->breed }}" />
                @error('breed') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                @enderror
                <label class="label text-white">Age</label>
                <input type="integer" class="input bg-[#0006]" name="age" value="{{ $pet->age }}" />
                @error('age') <small class="badge badge-outline badge-error w-full py-4">{{ $message }}</small>
                @enderror
            </div>

        </div>

        <div class="flex flex-wrap justify-center items-center mt-4">
            <button class="btn btn-accent w-full">Edit</button>
        </div>

    </form>
</div>

@endsection

@section('js')
<script>
    $(document).ready(function(){
        $('#upload').click(function(e){
            e.preventDefault()
            $('#image').click()
        })
        $('#image').change(function(e){
           e.preventDefault()
           $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]));
        })
    })
</script>
@endsection