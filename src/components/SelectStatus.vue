<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";
import { useStatusStore } from "../stores/statuses";
import { onBeforeUnmount, ref } from "vue";

const { user } = storeToRefs(useLoginStore());
const { statuses } = storeToRefs(useStatusStore());

const selectedStatus = ref("Select status");

const { fetchStatuses, setSelectedStatus, resetSelectedStatus } =
  useStatusStore();

fetchStatuses(user.value.token);

const handleSelectStatus = () => {
  console.log(selectedStatus.value);
  setSelectedStatus(selectedStatus.value);
};

onBeforeUnmount(() => {
  resetSelectedStatus();
});
</script>

<template>
  <select id="status" v-model="selectedStatus" @change="handleSelectStatus()">
    <option v-for="status in statuses" :key="status.id" :value="status.id">
      {{ status.name }}
    </option>
  </select>
</template>
