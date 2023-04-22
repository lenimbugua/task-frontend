<script setup>
import Spin from "./Spin.vue";
import NoData from "./NoData.vue";
import { useTaskStore } from "../stores/tasks.js";
import { useLoginStore } from "../stores/login.js";
import { formatDate } from "../utils/dates";

import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
const router = useRouter();

const { fetchTasks, setSelectedTask } = useTaskStore();
const { tasks, pending } = storeToRefs(useTaskStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

fetchTasks(token);

const goToUpdateTask = (task) => {
  setSelectedTask(task);
  router.push({ name: "update-task" });
};
</script>

<template>
  <div class="w-full flex justify-end px-1 py-2">
    <RouterLink
      :to="{ name: 'add-task' }"
      class="bg-sky-500 text-sky-50 shadow-md p-1 rounded-md"
      >Add Task</RouterLink
    >
  </div>
  <Spin v-if="pending" />
  <div v-else>
    <NoData v-if="tasks == null || !tasks.length" />
    <table
      v-else
      class="w-full border border-gray-200 rounded-md overflow-scroll"
    >
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
        <tr
          v-for="(task, index) in tasks"
          :key="index"
          class="text-sm divide-x"
        >
          <td class="py-2 px-3">{{ index + 1 }}</td>
          <td class="py-2 px-3">{{ task.name }}</td>
          <td class="py-2 px-3">{{ task.description }}</td>
          <td class="py-2 px-3">{{ task.relationships.status.name }}</td>
          <td class="py-2 px-3">{{ formatDate(task.created_at) }}</td>
          <td class="py-2 px-3">{{ formatDate(task.due_date) }}</td>
          <td
            class="py-2 px-3 cursor-pointer text-sky-500"
            @click="goToUpdateTask(task)"
          >
            Edit
          </td>
          <td class="py-2 px-3 text-red-500 cursor-pointer">Delete</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
