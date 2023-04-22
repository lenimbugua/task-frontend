<script setup>
import { useUserStore } from "../stores/users.js";
import { useLoginStore } from "../stores/login.js";
import { formatDate } from "../utils/dates";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();

const { fetchUsers, setSelectedUser } = useUserStore();
const { users } = storeToRefs(useUserStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

fetchUsers(token);
const goToAssignTask = (user) => {
  setSelectedUser(user.id);
  router.push({ name: "assign-task" });
};

const goToViewUserTasks = (user) => {
  setSelectedUser(user.id);
  router.push({ name: "user-tasks" });
};
</script>

<template>
  <table class="w-full border border-gray-200 rounded-md overflow-scroll">
    <thead>
      <tr class="text-sm bg-gray-100 text-left divide-x">
        <th class="py-2 px-3"></th>
        <th class="py-2 px-3">Name</th>
        <th class="py-2 px-3">Email</th>
        <th class="py-2 px-3">Created At</th>
        <th class="py-2 px-3">Updated At</th>
        <th class="py-2 px-3">View Tasks</th>
        <th class="py-2 px-3">Assign Task</th>
      </tr>
    </thead>
    <tbody class="divide-y">
      <tr v-for="(user, index) in users" :key="index" class="text-sm divide-x">
        <td class="py-2 px-3">{{ index + 1 }}</td>
        <td class="py-2 px-3">{{ user.name }}</td>
        <td class="py-2 px-3">{{ user.email }}</td>
        <td class="py-2 px-3">{{ formatDate(user.created_at) }}</td>
        <td class="py-2 px-3">{{ formatDate(user.updated_at) }}</td>
        <td
          class="py-2 px-3 cursor-pointer text-sky-500"
          @click="goToViewUserTasks(user)"
        >
          view
        </td>
        <td class="py-2 px-3">
          <div
            class="text-sky-50 flex justify-center p-1 items-center bg-sky-500 shadow-lg mx-auto rounded-md cursor-pointer"
            @click="goToAssignTask(user)"
          >
            Assign
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
