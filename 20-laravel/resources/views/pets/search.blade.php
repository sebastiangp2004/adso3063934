@forelse ($pets as $pet)
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
    <td class="hidden md:table-cell">
        @if($pet->kind == 'Dog')
        <span class="badge badge-soft badge-accent">Dog</span>
        @elseif(($pet->kind == 'cat'))
        <span class="badge badge-soft badge-warning">Cat</span>
        @elseif(($pet->kind == 'Bird'))
        <span class="badge badge-soft badge-info">Bird</span>
        @else
        <span class="badge badge-soft badge-error">Pig</span>
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
            <a href="javascript:;" class="group badge badge-outline btn-delete" data-name="{{ $pet->name }}">
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
@empty
<tr>
   <td class="text-center py-10 font-bold text-xl" colspan="8">
       No pets found
    </td> 
</tr>
<tr class="bg-[#fff9]">
    <td colspan="8 text">
        {{ $pets->links('layouts.pagination') }}
    </td>
</tr>
@endforelse