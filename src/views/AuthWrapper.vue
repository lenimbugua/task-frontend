<script setup></script>

<template>
  <main
    class="bg-img-1 relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8"
  >
    <img
      src="@/assets/images/beams-cover@95.jpeg"
      alt=""
      class="absolute top-0 inset-0 left-1/2 -ml-[47.5rem] w-[122.5rem] max-w-none"
    />
    <div
      class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
    >
      <svg
        class="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-bg"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
            x="100%"
            patternTransform="translate(0 -1)"
          >
            <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
      </svg>
    </div>
    <div
      class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16"
    >
      <div class="pb-8">
        <div class="flex space-x-2">
          <h3 class="text-4xl font-bold italic text-sky-500">Task manager</h3>
        </div>
      </div>
      <h1 class="sr-only">Log in to your task manager UI account</h1>
      <slot />
    </div>
  </main>
</template>
