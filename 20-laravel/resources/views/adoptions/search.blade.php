@forelse($adopts as $adopt)


<div class="card bg-[#99a1af99] mb-5 p-5 text-center datalist">
    <div class="avatar-group m-8 -space-x-6">
        <div class="avatar border-black">
            <div class="w-36">
                <img src="{{ asset('images/' . $adopt->user->photo) }}" />
            </div>
        </div>
        <div class="avatar border-black">
            <div class="w-36">
                <img src="{{ asset('images/' . $adopt->pet->image) }}" />
            </div>
        </div>
    </div>
    <h4 class="mb-4">
        <span class="underline font-bold">{{ $adopt->pet->name }}</span>
        was adopted by
        <span class="underline font-bold">{{ $adopt->user->fullname }}</span>
        on {{ $adopt->created_at->diffForHumans() }}
    </h4>
    <a href="{{ url('adoptions/' . $adopt->id) }}" class="btn btn-soft btn-info ">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
            </path>
        </svg>
        More info
    </a>
</div>
@empty
<div class="flex justify-center items-center my-10">
    <span class="ml-4 text-white text-lg">No adoption records found.</span>
</div>
@endforelse