<script setup>
import Spin from "./Spin.vue";
import NoData from "./NoData.vue";
import { useUserTaskStore } from "../stores/user-tasks";
import { useUserStore } from "../stores/users";
import { useLoginStore } from "../stores/login";

import { storeToRefs } from "pinia";
const { selectedUser } = storeToRefs(useUserStore());

// import { useRouter } from "vue-router";
// const router = useRouter();

const { fetchUserTasks } = useUserTaskStore();
const { userTasks } = storeToRefs(useUserTaskStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

const userID = selectedUser.value;
fetchUserTasks(userID, token);
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
          <td class="py-2 px-3">{{ userTask.relationships.task.description }}</td>
          <td class="py-2 px-3">{{ userTask.relationships.status.name }}</td>
          <td class="py-2 px-3">{{ userTask.start_time }}</td>
          <td class="py-2 px-3">{{ userTask.end_time }}</td>
          <td class="py-2 px-3">{{ userTask.remarks }}</td>
          <td class="py-2 px-3">{{ userTask.relationships.task.due_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
