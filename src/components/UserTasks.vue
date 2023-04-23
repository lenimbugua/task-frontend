<script setup>
import Spin from "./Spin.vue";
import NoData from "./NoData.vue";
import { useUserTaskStore } from "../stores/user-tasks";
import { useUserStore } from "../stores/users";
import { useLoginStore } from "../stores/login";
import swal from "sweetalert2";

import { storeToRefs } from "pinia";
const { selectedUser } = storeToRefs(useUserStore());

// import { useRouter } from "vue-router";
// const router = useRouter();

const { fetchUserTasks, deleteTask, startTask, endTask } = useUserTaskStore();
const { userTasks, responseOK, nonFieldErrors } = storeToRefs(
  useUserTaskStore()
);
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

const userID = selectedUser.value;
fetchUserTasks(userID, token);

const removeTask = async (taskID) => {
  swal
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3DA5E9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await deleteTask(taskID, token);
        console.log(taskID);
        if (responseOK.value) {
          await fetchUserTasks(userID, token);
          swal.fire("Deleted!", "task deleted.", "success");
        }
      }
    });
};

const startATask = async (taskID) => {
  swal
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3DA5E9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, start it!",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await startTask({ user_task_id: taskID }, token);
        console.log(taskID);
        if (responseOK.value) {
          await fetchUserTasks(userID, token);
          swal.fire("Started!", "task started.", "success");
        }
      }
    });
};

const endATask = async (taskID) => {
  await swal.fire({
    title: "Remarks",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "End Task",
    showLoaderOnConfirm: true,
    preConfirm: async (remarks) => {
      try {
        await endTask({ user_task_id: taskID, remarks: remarks }, token);

        if (!responseOK.value) {
          throw new Error(nonFieldErrors.value);
        }
      } catch (error) {
        swal.showValidationMessage(`Request failed: ${error}`);
      }
    },
    allowOutsideClick: () => !swal.isLoading(),
  });

  if (responseOK.value) {
    await fetchUserTasks(userID, token);
    swal.fire("Task Ended!", "task ended.", "success");
  }
};
</script>

<template>
  <Spin v-if="pending" />
  <div v-else>
    <NoData v-if="userTasks == null || !userTasks.length" />
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
          <th class="py-2 px-3">Start Time</th>
          <th class="py-2 px-3">End Time</th>
          <th class="py-2 px-3">Remarks</th>
          <th class="py-2 px-3">Due Date</th>
          <th class="py-2 px-3 text-red-500"></th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr
          v-for="(userTask, index) in userTasks"
          :key="index"
          class="text-sm divide-x"
        >
          <td class="py-2 px-3">{{ index + 1 }}</td>
          <td class="py-2 px-3">{{ userTask.relationships.task.name }}</td>
          <td class="py-2 px-3">
            {{ userTask.relationships.task.description }}
          </td>
          <td class="py-2 px-3">{{ userTask.relationships.status.name }}</td>
          <td class="py-2 px-3">
            <div
              v-if="userTask.start_time == null"
              class="bg-sky-500 cursor-pointer text-sky-50 flex justify-center shadow-md rounded-md p-1"
              @click="startATask(userTask.id)"
            >
              Start
            </div>
            <div v-else>{{ userTask.start_time }}</div>
          </td>
          <td class="py-2 px-3">
            <div v-if="userTask.start_time == null">Not Started</div>
            <div
              v-else-if="userTask.end_time == null"
              class="bg-sky-500 cursor-pointer text-sky-50 flex justify-center shadow-md rounded-md p-1"
              @click="endATask(userTask.id)"
            >
              End
            </div>
            <div v-else>{{ userTask.end_time }}</div>
          </td>
          <td class="py-2 px-3">{{ userTask.remarks }}</td>
          <td class="py-2 px-3">{{ userTask.relationships.task.due_date }}</td>
          <td
            class="py-2 px-3 text-red-500 cursor-pointer"
            @click="removeTask(userTask.id)"
          >
            DELETE
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
