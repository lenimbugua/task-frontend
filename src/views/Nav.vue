<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import TheProfile from "@/components/TheProfile.vue";
</script>

<template>
  <div class="absolute w-full h-full left-0 top-0">
    <TheNavigation />
    <div
      class="absolute left-52 right-0 top-0 bottom-0"
      :class="{ 'bg-gray-50': $route.name == 'dashboard' }"
    >
      <div class="flex items-end border-b px-6 py-4 sticky top-0 bg-white z-10">
        <div class="text-lg">{{ $route.meta.title }}</div>
        <TheProfile />
      </div>

      <div class="px-1 py-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>
