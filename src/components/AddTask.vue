<script setup>
import Spin from "./Spin.vue";
import SelectStatus from "./SelectStatus.vue";
import { useTaskStore } from "../stores/tasks";
import { useLoginStore } from "../stores/login";
import { ref, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { getFormErrorsByField, fieldHasError } from "../utils/errors";
import { useRouter } from "vue-router";
import swal from "sweetalert2";

import { getTodayDate } from "../utils/dates";
import { useStatusStore } from "../stores/statuses";

const router = useRouter();
const { user } = storeToRefs(useLoginStore());

const { fieldErrors, nonFieldErrors, pending, responseOK } = storeToRefs(
  useTaskStore()
);
const { selectedStatus } = storeToRefs(useStatusStore());

const { addTask, fetchTasks, clearErrors } = useTaskStore();

const name = ref("");
const description = ref("");
const dueDate = ref(getTodayDate());

const createStatus = async () => {
  const token = user.value.token;
  const body = {
    name: name.value,
    description: description.value,
    due_date: dueDate.value,
    status_id: selectedStatus.value,
  };
  await addTask(body, token);

  if (responseOK.value) {
    await fetchTasks(token);
    swal.fire("Task Created!", "Good Job");
    router.push({ name: "tasks" });
  }
};

onBeforeUnmount(() => {
  clearErrors();
});
</script>

<template>
  <div class="shadow-md p-5 bg-white h-[40rem] overflow-scroll">
    <p class="text-red-500 mb-6">
      {{ nonFieldErrors }}
    </p>
    <form class="w-full" @submit.prevent="createStatus">
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
      <div class="mb-3">
        <label
          for="name"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Name</label
        ><input
          id="name"
          v-model="name"
          type="text"
          :class="{
            'ring-1 ring-red-500 bg-red-50': fieldHasError(fieldErrors, 'name'),
          }"
          class="appearance-none text-slate-900 bg-gray-50 rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:bg-white ring-1 ring-slate-200"
          aria-required
        />
        <p class="text-red-500 mb-6 text-sm">
          {{ getFormErrorsByField(fieldErrors, "name") }}
        </p>
      </div>
      <div class="mb-3">
        <label
          for="description"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Description</label
        ><input
          id="description"
          v-model="description"
          type="text"
          :class="{
            'ring-1 ring-red-500 bg-red-50': fieldHasError(
              fieldErrors,
              'description'
            ),
          }"
          class="appearance-none text-slate-900 bg-gray-50 rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          required
        />
        <p class="text-red-500 mb-6 text-sm">
          {{ getFormErrorsByField(fieldErrors, "description") }}
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
          name="trip-start"
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
      >
        <spin v-if="pending" />
        <span v-else>Add Task</span>
      </button>
    </form>
  </div>
</template>
