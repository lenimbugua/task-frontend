<script setup>
import { CheckIcon } from "@heroicons/vue/24/outline";
import { useStatsStore } from "@/stores/stats";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const { getTotalUserTasks } = useStatsStore();
const { totalCompletedTasks } = storeToRefs(useStatsStore());
const { user } = storeToRefs(useLoginStore());

const token = user.value.token;

getTotalUserTasks(token);
</script>
<template>
  <div
    class="block shadow-lg rounded-md w-full p-1 space-y-2 bg-green-500/60 text-green-50"
  >
    <div>
      <CheckIcon class="h-8 w-8" />
    </div>
    <div class="text-sm font-medium">Total Completed Tasks</div>
    <div class="font-bold leading-5 text-4xl">{{ totalCompletedTasks }}</div>
  </div>
</template>
