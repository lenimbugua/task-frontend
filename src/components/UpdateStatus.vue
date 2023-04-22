<script setup>
import Spin from "./Spin.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { getFormErrorsByField, fieldHasError } from "../utils/errors";
import { useStatusStore } from "../stores/statuses";
import { useLoginStore } from "../stores/login";
import { useRouter } from "vue-router";
import swal from "sweetalert2";

const router = useRouter();
const { user } = storeToRefs(useLoginStore());

const { fieldErrors, nonFieldErrors, pending, responseOK, selectedStatus } =
  storeToRefs(useStatusStore());

const { updateStatus, fetchStatuses } = useStatusStore();

const status = ref(selectedStatus.value);

const editStatus = async () => {
  const token = user.value.token;
  const body = {
    name: status.value.name,
    id: status.value.id,
  };
  await updateStatus(body, token);

  if (responseOK.value) {
    await fetchStatuses(token);
    swal.fire("Status Updated!", "Good Job");
    router.push({ name: "status" });
  } else {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${nonFieldErrors.value}!`,
    });
  }
};
</script>
<template>
  <div class="shadow-md p-5 bg-white h-[40rem] overflow-scroll">
    <p class="text-red-500 mb-6">
      {{ nonFieldErrors }}
    </p>
    <form class="w-full" @submit.prevent="editStatus">
      <div class="mb-3">
        <label
          for="name"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Name</label
        ><input
          id="name"
          v-model="status.name"
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

      <button
        type="submit"
        class="mt-3 inline-flex rounded-lg text-sm font-semibold py-2.5 px-4 text-sky-50 bg-sky-500 hover:text-sky-50/80 hover:bg-sky-600"
      >
        <spin v-if="pending" />
        <span v-else>Update Status</span>
      </button>
    </form>
  </div>
</template>
