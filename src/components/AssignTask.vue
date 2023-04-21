<script setup>
import SelectTask from "./SelectTask.vue";
import SelectStatus from "./SelectStatus.vue";
import { ref } from "vue";
const dueDate = ref("2018-07-22");
</script>
<template>
  <div class="mb-3">
    <label
      for="company"
      class="block text-sm font-semibold leading-6 text-gray-900"
      >Select Task</label
    >
    <SelectTask
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    />
  </div>
  <div class="mb-3">
    <label
      for="company"
      class="block text-sm font-semibold leading-6 text-gray-900"
      >Select Status</label
    >
    <SelectStatus
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    />
  </div>
  <div
    class="px-5 flex items-center appearance-none text-slate-900 bg-gray-50 rounded-md w-full h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:bg-white ring-1 ring-slate-200"
  >
    <input
      id="start"
      v-model="dueDate"
      type="date"
      name="trip-start"
      min="2018-01-01"
      max="2023-12-31"
    />
  </div>
</template>
