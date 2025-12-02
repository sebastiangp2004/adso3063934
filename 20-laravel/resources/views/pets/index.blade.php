@extends('layouts.dashboard')
@section('title', 'Module Pets: Larapets🐕‍🦺')

@section('content')
<h1 class="text-4xl text-white flex gap-2 items-center justify-center pb-4 border-b-2 border-neutral-50 mb-5">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
        <path
            d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
        </path>
    </svg>
    Module pets
</h1>

{{-- Options --}}
<div class="join mb-5 mx-auto">
    <a class="btn btn-outline btn-success join-item" href="{{ url('pets/create') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z">
            </path>
        </svg>
        <span class="hidden md:inline">Add pet</span>
    </a>
    <a class="btn btn-outline btn-info join-item" href="{{ url('export/pets/pdf') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z">
            </path>
        </svg>
        <span class="hidden md:inline">Export</span>
    </a>
    <a class="btn btn-outline btn-info join-item" href="{{ url('export/pets/excel') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M156,208a8,8,0,0,1-8,8H120a8,8,0,0,1-8-8V152a8,8,0,0,1,16,0v48h20A8,8,0,0,1,156,208ZM92.65,145.49a8,8,0,0,0-11.16,1.86L68,166.24,54.51,147.35a8,8,0,1,0-13,9.3L58.17,180,41.49,203.35a8,8,0,0,0,13,9.3L68,193.76l13.49,18.89a8,8,0,0,0,13-9.3L77.83,180l16.68-23.35A8,8,0,0,0,92.65,145.49Zm98.94,25.82c-4-1.16-8.14-2.35-10.45-3.84-1.25-.82-1.23-1-1.12-1.9a4.54,4.54,0,0,1,2-3.67c4.6-3.12,15.34-1.72,19.82-.56a8,8,0,0,0,4.07-15.48c-2.11-.55-21-5.22-32.83,2.76a20.58,20.58,0,0,0-8.95,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.33-2.15,3.93-4.6,3.06-15.16,1.55-19.54.35A8,8,0,0,0,173.93,214a60.63,60.63,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.81,20.81,0,0,0,9.18-15.23C218,179,201.48,174.17,191.59,171.31ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,1,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.68L160,51.31Z">
            </path>
        </svg>
        <span class="hidden md:inline">Export</span>
    </a>

</div>


<div class="overflow-x-auto rounded-box border  border-base-content/5 bg-[#fffa]">
    <table class="table">
        <!-- head -->
        <thead class="bg-[#fff9]">
            <tr>
                <th class="hidden md:table-cell">Id</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Kind</th>
                <th class="hidden md:table-cell">age</th>
                <th class="hidden md:table-cell">Active</th>
                <th class="hidden md:table-cell">status</th>
                <th>
                    {{-- buscar --}}
                    <label class="input bg-white/30 rounded-full flex items-center gap-2 px-3 py-1">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                                stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" placeholder="Search..." name="qsearch" id="qsearch" />
                    </label>
                </th>
            </tr>
        </thead>
        <tbody class="datalist">
            @foreach ($pets as $pet)
            <!-- row 1 -->
            <tr @if($pet->id % 2 == 0) class="bg-[#fff3]" @endif>
                <td class="hidden md:table-cell">{{ $pet->id }}</td>
                <td>
                    <div class="avatar">
                        <div class="mask mask-squircle w-12">
                            <img src="{{ asset('images/'.$pet->image) }}" />
                        </div>
                    </div>
                </td>
                <td>{{ $pet->name }}</td>
                <td>
                    @if($pet->kind == 'Dog')
                    <span class="badge badge-soft badge-accent">Dog</span>
                    @elseif(($pet->kind == 'Cat'))
                    <span class="badge badge-soft badge-warning">Cat</span>
                    @elseif(($pet->kind == 'Bird'))
                    <span class="badge badge-soft badge-info">Bird</span>
                    @elseif($pet->kind == 'Pig')
                    <span class="badge badge-soft badge-error">Pig</span>
                    @else
                    <span class="badge badge-soft badge-default">{{ $pet->kind }}</span>
                    @endif
                </td>
                <td class="hidden md:table-cell">{{ $pet->age }}</td>
                <td class="hidden md:table-cell text-center">
                    @if($pet->active == 1)
                    <span class="badge badge-soft badge-success">Yes</span>
                    @else
                    <span class="badge badge-soft badge-error">No</span>
                    @endif
                </td>
                <td class="hidden md:table-cell">
                    @if($pet->status == '1')
                    <span class="badge badge-soft badge-warning w-full">Adopted</span>
                    @else
                    <span class="badge badge-soft badge-default w-full">
                        not adopted</span>
                    @endif
                </td>
                <td>
                    <div class="flex gap-3 justify-center">
                        <a href="{{ url('pets/'.$pet->id) }}" class="group badge badge-outline">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="size-5 hover:scale-120 group-hover:text-green-500 transition" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                                </path>
                            </svg>
                        </a>

                        <a href="{{ url('pets/'.$pet->id.'/edit') }}" class="group badge badge-outline">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="size-5 hover:scale-120 group-hover:text-blue-500 transition" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z">
                                </path>
                            </svg>
                        </a>
                        <a href="javascript:;" class="group badge badge-outline btn-delete"
                            data-name="{{ $pet->name }}">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="size-5 hover:scale-120 group-hover:text-red-500 transition" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z">
                                </path>
                            </svg>
                        </a>

                        <form class="hidden" method="POST" action="{{ url('pets/'.$pet->id) }}">
                            @csrf
                            @method('delete')

                        </form>
                    </div>
                </td>
            </tr>
            @endforeach
            <tr class="bg-[#fff9]">
                <td colspan="8 text">
                    {{ $pets->links('layouts.pagination') }}
                </td>
            </tr>
        </tbody>
    </table>
</div>

{{-- Modal --}}
<dialog id="success_modal" class="modal">
    <div class="modal-box bg-sucess">
        <h3 class="text-lg font-bold">Congrats!</h3>
        <div role="alert" class="alert alert-soft alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{session('success')}}</span>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>



<dialog id="delete_modal" class="modal">

    <div class="modal-box bg-sucess">

        <div class="flex justify-between">
            <h3 class="text-lg font-bold">Are you sure?</h3>
            <form method="dialog">
                <button class="btn btn-soft btn-error w-8 h-8">
                    x
                </button>
            </form>
        </div>
        <div role="alert"
            class="alert alert-soft alert-info mt-4 flex flex-col md:flex-row gap-4 md:gap-2 justify-between items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>You want to deleted: <strong class="name"></strong></span>
            <button class="btn btn-soft btn-error btn-confirm">Confirm</button>

        </div>

    </div>
    <form method="dialog" class="modal-backdrop">
        <button>Cancel</button>
    </form>
</dialog>


@endsection

@section('js')
<script>
    // Modal success
    @if(session('success'))
    const success_modal = document.getElementById('success_modal');
    success_modal.showModal();
    @endif

    // Module Delete
    $('table').on('click', '.btn-delete', function(){
        $name = $(this).data('name')
        $('.name').text($name)
        $frm = $(this).next()
        delete_modal.showModal()
    })
    $('.btn-confirm').click(function(e){
        e.preventDefault()
            $frm.submit()
    })

    // Search
    function debounce(func, wait) {
        let timeout
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            };
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }
    const search = debounce(function(query) {
        
        $token = $('input[name=_token]').val()
        
        $.post("search/pets", {'q': query, '_token': $token},
            function (data) {
                $('.datalist').html(data).hide().fadeIn(1000)
            }
        )
    }, 500)
    $('body').on('input', '#qsearch', function(event) {
        event.preventDefault()
        const query = $(this).val()
        
        $('.datalist').html(`<tr>
                                <td colspan="8" class="text-center py-18">
                                    <span class="loading loading-spinner loading-xl"></span>
                                </td>
                            </tr>`)
        
        if(query != ''){
            search(query)
        }else{
            setTimeout(() => {
                window.location.replace('pets')
            }, 500);
        }
    })

    // Import
    $('.btn-import').click(function(e){
        $('#file').click()
    })
    $('#file').change(function(e){
        $(this).parent().submit()
    })


</script>

@endsection