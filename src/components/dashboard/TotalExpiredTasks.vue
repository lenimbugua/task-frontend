<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useStatsStore } from "@/stores/stats";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const { getTotalExpiredTasks } = useStatsStore();
const { totalExpiredTasks } = storeToRefs(useStatsStore());
const { user } = storeToRefs(useLoginStore());

const token = user.value.token;

getTotalExpiredTasks(token);
</script>
<template>
  <div
    class="block shadow-lg rounded-md w-full p-1 space-y-2 bg-red-500/70 text-red-50"
  >
    <div>
      <XMarkIcon class="h-8 w-8" />
    </div>
    <div class="text-sm font-medium">Total Expired Tasks</div>
    <div class="font-bold leading-5 text-4xl">{{ totalExpiredTasks }}</div>
  </div>
</template>
