<script setup>
import Spin from "./Spin.vue";
import NoData from "./NoData.vue";
import { useStatusStore } from "../stores/statuses.js";
import { useLoginStore } from "../stores/login.js";

import { formatDate } from "../utils/dates";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import swal from "sweetalert2";

const router = useRouter();

const { fetchStatuses, setSelectedStatus, deleteStatus } = useStatusStore();
const { statuses, responseOK } = storeToRefs(useStatusStore());
const { user: authUser } = storeToRefs(useLoginStore());

const token = authUser.value.token;

fetchStatuses(token);

const goToEditStatus = (status) => {
  setSelectedStatus(status);
  router.push({ name: "update-status" });
};
const removeStatus = async (statusID) => {
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
        await deleteStatus(statusID, token);
        console.log(statusID);
        if (responseOK.value) {
          await fetchStatuses(token);
          swal.fire("Deleted!", "status deleted.", "success");
        }
      }
    });
};
</script>

<template>
  <div class="w-full flex justify-end px-1 py-2">
    <RouterLink
      :to="{ name: 'add-status' }"
      class="bg-sky-500 text-sky-50 shadow-md p-1 rounded-md"
      >Add Status</RouterLink
    >
  </div>
  <Spin v-if="pending" />
  <div v-else>
    <NoData v-if="statuses == null || !statuses.length" />
    <table
      v-else
      class="w-full border border-gray-200 rounded-md overflow-scroll"
    >
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
        <tr
          v-for="(status, index) in statuses"
          :key="index"
          class="text-sm divide-x"
        >
          <td class="py-2 px-3">{{ index + 1 }}</td>
          <td class="py-2 px-3">{{ status.name }}</td>
          <td class="py-2 px-3">color</td>
          <td class="py-2 px-3">{{ formatDate(status.created_at) }}</td>
          <td class="py-2 px-3">{{ formatDate(status.updated_at) }}</td>
          <td
            class="py-2 px-3 cursor-pointer text-sky-500"
            @click="goToEditStatus(status)"
          >
            Edit
          </td>
          <td
            class="py-2 px-3 text-red-500 cursor-pointer"
            @click="removeStatus(status.id)"
          >
            Delete
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
