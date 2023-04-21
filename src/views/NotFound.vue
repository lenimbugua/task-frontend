<template>
  <!-- component -->

  <div
    class="bg-gradient-to-r from-sky-600 via-purple-500 to-sky-500 text-white min-h-screen flex items-center"
  >
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="max-w-xl mx-auto md:text-left p-4">
        <div class="text-8xl font-extra-bold">404</div>
        <div class="text-xl md:text-3xl font-medium mb-4">
          Oops. This page has gone missing.
        </div>
        <div class="text-lg mb-8">
          You may have mistyped the address or the page may have moved.
        </div>
        <RouterLink to="/" class="border border-white rounded p-4"
          >Go Home</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.gradient {
  background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
}
</style>
