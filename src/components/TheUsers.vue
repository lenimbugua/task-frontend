<script setup>
import { useUserStore } from "../stores/users.js";
import { useLoginStore } from "../stores/login.js";

import { storeToRefs } from "pinia";

const { fetchUsers } = useUserStore();
const { users } = storeToRefs(useUserStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

fetchUsers(token);
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
        <td class="py-2 px-3">{{ user.created_at }}</td>
        <td class="py-2 px-3">{{ user.updated_at }}</td>
        <td class="py-2 px-3 cursor-pointer text-sky-500">view</td>
        <td class="py-2 px-3">
          <RouterLink
            :to="{ name: 'assign-task' }"
            class="text-sky-50 flex justify-center p-1 items-center bg-sky-500 shadow-lg mx-auto rounded-md cursor-pointer"
          >
            Assign
          </RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>
