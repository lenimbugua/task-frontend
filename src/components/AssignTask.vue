<script setup>
import SelectTask from "./SelectTask.vue";
import Spin from "./Spin.vue";
import SelectStatus from "./SelectStatus.vue";
import { getFormErrorsByField, fieldHasError } from "../utils/errors";
import { getTodayDate } from "../utils/dates";
import { useTaskStore } from "../stores/tasks.js";
import { useUserTaskStore } from "../stores/user-tasks.js";
import { useStatusStore } from "../stores/statuses.js";
import { useUserStore } from "../stores/users.js";
import { useLoginStore } from "../stores/login.js";

import swal from "sweetalert2";

import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
const router = useRouter();

const { selectedTask } = storeToRefs(useTaskStore());
const { fieldErrors, responseOK, pending } = storeToRefs(useUserTaskStore());
const { selectedUser } = storeToRefs(useUserStore());
const { assignUserTask, fetchUserTasks } = useUserTaskStore();
const { selectedStatus } = storeToRefs(useStatusStore());

const { user } = storeToRefs(useLoginStore());
const token = user.value.token;

const dueDate = ref(getTodayDate());

const assignTask = async () => {
  const userID = selectedUser.value;
  const body = {
    user_id: selectedUser.value,
    task_id: selectedTask.value,
    due_date: dueDate.value,
    status_id: selectedStatus.value,
  };

  await assignUserTask(body, token);
  if (responseOK.value) {
    await fetchUserTasks(userID, token);
    swal.fire("Task Assigned!", "Good Job");
    router.push({ name: "user-tasks" });
  }
};
</script>
<template>
  <div class="mb-3">
    <label
      for="company"
      class="block text-sm font-semibold leading-6 text-gray-900"
      >Select Task</label
    >
    <SelectTask
      :class="{
        'ring-1 ring-red-500 bg-red-50': fieldHasError(fieldErrors, 'task'),
      }"
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    />
    <p class="text-red-500 mb-6 text-sm">
      {{ getFormErrorsByField(fieldErrors, "task") }}
    </p>
  </div>
  <div class="mb-3">
    <label
      for="status"
      class="block text-sm font-semibold leading-6 text-gray-900"
      >Select Status</label
    ><SelectStatus
      :class="{
        'ring-1 ring-red-500 bg-red-50': fieldHasError(
          fieldErrors,
          'status_id'
        ),
      }"
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    />
    <p class="text-red-500 mb-6 text-sm">
      {{ getFormErrorsByField(fieldErrors, "status_id") }}
    </p>
  </div>
  <div>
    <label
      for="name"
      class="block text-sm font-semibold leading-6 text-gray-900"
      >Due Date</label
    >

    <input
      id="start"
      v-model="dueDate"
      class="px-5 flex items-center appearance-none text-slate-900 bg-gray-50 rounded-md w-full h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:bg-white ring-1 ring-slate-200"
      :class="{
        'ring-1 border-red-500 bg-red-50': fieldHasError(
          fieldErrors,
          'due_date'
        ),
      }"
      type="date"
      name="due_date"
      :min="getTodayDate()"
      max="2023-12-31"
    />
    <p class="text-red-500 mb-6 text-sm">
      {{ getFormErrorsByField(fieldErrors, "due_date") }}
    </p>
  </div>
  <button
    type="submit"
    class="mt-3 inline-flex rounded-lg text-sm font-semibold py-2.5 px-4 text-sky-50 bg-sky-500 hover:text-sky-50/80 hover:bg-sky-600"
    @click="assignTask"
  >
    <spin v-if="pending" />
    <span v-else>Assign Task</span>
  </button>
</template>
