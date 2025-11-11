<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pet Details</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-teal-900 p-10 min-h-[100dvh]">
    <div class="max-w-4xl mx-auto">
        <!-- Encabezado con botón de volver -->
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-white text-4xl border-b-2 pb-4">Pet Details 🐣</h1>
            <a href="{{ url('view/pets') }}" class="text-white bg-teal-700 rounded-full flex items-center gap-2 py-2 px-4 hover:scale-105 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
                Back to List
            </a>
        </div>
        
        <!-- Tarjeta de la mascota -->
        <div class="card lg:card-side bg-base-100 shadow-xl">
            <figure class="lg:w-1/2">
                <img class="w-full h-full object-cover" src="{{asset('images/'.$pet->image)}}" alt="{{$pet->name}}" />
            </figure>
            <div class="card-body lg:w-1/2">
                <h2 class="card-title text-3xl">{{$pet->name}}</h2>
                
                <!-- Badge del tipo de mascota -->
                @if($pet->kind == 'Dog')
                <div class="badge badge-primary text-lg py-3 px-4">Dog</div>
                @elseif($pet->kind == 'Cat')
                <div class="badge badge-success text-lg py-3 px-4">Cat</div>
                @elseif($pet->kind == 'Pig')
                <div class="badge badge-secondary text-lg py-3 px-4">Pig</div>
                @elseif($pet->kind == 'Bird')
                <div class="badge badge-warning text-lg py-3 px-4">Bird</div>
                @endif
                
                <!-- Información adicional -->
                <div class="mt-4">
                    <h3 class="text-xl font-semibold mb-2">About {{$pet->name}}</h3>
                    <p class="text-lg">{{$pet->description}}</p>
                </div>
                
                <!-- Información detallada -->
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-teal-50 p-4 rounded-lg">
                        <h4 class="font-bold text-teal-800">Age</h4>
                        <p class="text-lg">{{$pet->age ?? 'Not specified'}} years</p>
                    </div>
                    <div class="bg-teal-50 p-4 rounded-lg">
                        <h4 class="font-bold text-teal-800">Breed</h4>
                        <p class="text-lg">{{$pet->breed ?? 'Not specified'}}</p>
                    </div>
                    <div class="bg-teal-50 p-4 rounded-lg">
                        <h4 class="font-bold text-teal-800">Weight</h4>
                        <p class="text-lg">{{$pet->weight ?? 'Not specified'}} kg</p>
                    </div>
                    <div class="bg-teal-50 p-4 rounded-lg">
                        <h4 class="font-bold text-teal-800">Location</h4>
                        <p class="text-lg">{{$pet->location ?? 'Not specified'}}</p>
                    </div>
                    <div class="bg-teal-50 p-4 rounded-lg">
                        <h4 class="font-bold text-teal-800">Status</h4>
                        @if($pet->status == 0)
                        <div class="badge badge-success">Available</div>
                        @else
                        <div class="badge badge-error">Not Available</div>
                        @endif
                    </div>
                    <div class="bg-teal-50 p-4 rounded-lg">
                        <h4 class="font-bold text-teal-800">Active</h4>
                        @if($pet->active == 1)
                        <div class="badge badge-info">Active</div>
                        @else
                        <div class="badge badge-warning">Inactive</div>
                        @endif
                    </div>
                </div>
                
                <!-- Acciones -->
                <div class="card-actions justify-end mt-8">
                    @if($pet->status == 0)
                    <button class="btn btn-primary text-white">
                        
                        Adopt {{$pet->name}}
                    </button>
                    @else
                    <button class="btn btn-disabled text-white">
                        Not Available for Adoption
                    </button>
                    @endif
                </div>
            </div>
        </div>
    </div>
</body>
</html>