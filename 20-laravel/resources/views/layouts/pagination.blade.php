@if ($paginator->hasPages())
<nav role="navigation" aria-label="{{ __('Pagination Navigation') }}" class="flex items-center justify-between">
    <div class="flex justify-between flex-1 sm:hidden">

        {{-- Previous --}}
        @if ($paginator->onFirstPage())
        <span class="inline-flex items-center px-4 py-2 
            bg-black/10 border border-black/40 rounded-xl text-black/40 cursor-default">
            « Previous
        </span>
        @else
        <a href="{{ $paginator->previousPageUrl() }}" class="inline-flex items-center px-4 py-2 
           bg-black/10 border border-black/40 rounded-xl text-black
           hover:bg-black/20 transition">
            « Previous
        </a>
        @endif

        {{-- Next --}}
        @if ($paginator->hasMorePages())
        <a href="{{ $paginator->nextPageUrl() }}" class="inline-flex items-center px-4 py-2 
           bg-black/10 border border-black/40 rounded-xl text-black 
           hover:bg-black/20 transition">
            Next »
        </a>
        @else
        <span class="inline-flex items-center px-4 py-2 
            bg-black/10 border border-black/40 rounded-xl text-gray-400 cursor-default">
            Next »
        </span>
        @endif

    </div>


    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
        <div>
            <span class="relative z-0 inline-flex rtl:flex-row-reverse gap-2">

                {{-- Previous --}}
                @if ($paginator->onFirstPage())
                <span class="inline-flex items-center justify-center w-10 h-10 
            bg-black/10 border border-black/40 rounded-xl opacity-40 cursor-default">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z">
                        </path>
                    </svg>
                </span>
                @else
                <a href="{{ $paginator->previousPageUrl() }}" class="inline-flex items-center justify-center w-10 h-10 
           bg-black/10 border border-black/40 rounded-xl hover:bg-black/20 transition">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z">
                        </path>
                    </svg>
                </a>
                @endif

                {{-- Page numbers --}}
                @foreach ($elements as $element)
                @if (is_array($element))
                @foreach ($element as $page => $url)

                @if ($page == $paginator->currentPage())
                <span class="inline-flex items-center justify-center min-w-10 h-10 px-4
                        bg-black/20 border border-black/40 rounded-xl font-semibold">
                    {{ $page }}
                </span>
                @else
                <a href="{{ $url }}" class="inline-flex items-center justify-center min-w-10 h-10 px-4
                       bg-black/10 border border-black/40 rounded-xl hover:bg-black/20 transition">
                    {{ $page }}
                </a>
                @endif

                @endforeach
                @endif
                @endforeach

                {{-- Next --}}
                @if ($paginator->hasMorePages())
                <a href="{{ $paginator->nextPageUrl() }}" class="inline-flex items-center justify-center w-10 h-10 
           bg-black/10 border border-black/40 rounded-xl hover:bg-black/20 transition">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z">
                        </path>
                    </svg>
                </a>
                @else
                <span class="inline-flex items-center justify-center w-10 h-10 
            bg-black/10 border border-black/40 rounded-xl opacity-40 cursor-default">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z">
                        </path>
                    </svg>
                </span>
                @endif

            </span>

        </div>
    </div>
</nav>
@endif