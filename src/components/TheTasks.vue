<script setup>
import { useTaskStore } from "../stores/tasks.js";
import { useLoginStore } from "../stores/login.js";

import { storeToRefs } from "pinia";

const { fetchTasks } = useTaskStore();
const { tasks } = storeToRefs(useTaskStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

fetchTasks(token);
</script>

<template>
  <table class="w-full border border-gray-200 rounded-md overflow-scroll">
    <thead>
      <tr class="text-sm bg-gray-100 text-left divide-x">
        <th class="py-2 px-3"></th>
        <th class="py-2 px-3">Name</th>
        <th class="py-2 px-3">Description</th>
        <th class="py-2 px-3">Status</th>
        <th class="py-2 px-3">Created At</th>
        <th class="py-2 px-3">Due Date</th>
        <th class="py-2 px-3"></th>
        <th class="py-2 px-3"></th>
      </tr>
    </thead>
    <tbody class="divide-y">
      <tr v-for="(task, index) in tasks" :key="index" class="text-sm divide-x">
        <td class="py-2 px-3">{{ index + 1 }}</td>
        <td class="py-2 px-3">{{ task.name }}</td>
        <td class="py-2 px-3">{{ task.description }}</td>
        <td class="py-2 px-3">{{ task.relationships.status.name }}</td>
        <td class="py-2 px-3">{{ task.created_at }}</td>
        <td class="py-2 px-3">{{ task.due_date }}</td>
        <td class="py-2 px-3 cursor-pointer text-sky-500">Edit</td>
        <td class="py-2 px-3 text-red-500 cursor-pointer">Delete</td>
      </tr>
    </tbody>
  </table>
</template>
