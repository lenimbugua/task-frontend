<script setup>
import { useStatusStore } from "../stores/statuses.js";
import { useLoginStore } from "../stores/login.js";

import { storeToRefs } from "pinia";

const { fetchStatuses } = useStatusStore();
const { statuses } = storeToRefs(useStatusStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

fetchStatuses(token);
</script>

<template>
  <table class="w-full border border-gray-200 rounded-md overflow-scroll">
    <thead>
      <tr class="text-sm bg-gray-100 text-left divide-x">
        <th class="py-2 px-3"></th>
        <th class="py-2 px-3">Name</th>
        <th class="py-2 px-3">Color</th>
        <th class="py-2 px-3">Created At</th>
        <th class="py-2 px-3">Updated At</th>
        <th class="py-2 px-3"></th>
        <th class="py-2 px-3"></th>
      </tr>
    </thead>
    <tbody class="divide-y">
      <tr v-for="(status, index) in statuses" :key="index" class="text-sm divide-x">
        <td class="py-2 px-3">{{ index + 1 }}</td>
        <td class="py-2 px-3">{{ status.name }}</td>
        <td class="py-2 px-3">color</td>
        <td class="py-2 px-3">{{ status.created_at }}</td>
        <td class="py-2 px-3">{{ status.due_date }}</td>
        <td class="py-2 px-3 cursor-pointer text-sky-500">Edit</td>
        <td class="py-2 px-3 text-red-500 cursor-pointer">Delete</td>
      </tr>
    </tbody>
  </table>
</template>
