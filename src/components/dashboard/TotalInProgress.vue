<script setup>
import { ArrowPathRoundedSquareIcon } from "@heroicons/vue/24/outline";
import { useStatsStore } from "@/stores/stats";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const { getTotalInProgressTasks } = useStatsStore();
const { totalInProgressTasks } = storeToRefs(useStatsStore());
const { user } = storeToRefs(useLoginStore());

const token = user.value.token;

getTotalInProgressTasks(token);
</script>
<template>
  <div
    class="block shadow-lg rounded-md w-full p-1 space-y-2 bg-blue-500/60 text-blue-50"
  >
    <div>
      <ArrowPathRoundedSquareIcon class="h-8 w-8" />
    </div>
    <div class="text-sm font-medium">Total In Progress Tasks</div>
    <div class="font-bold leading-5 text-4xl">{{ totalInProgressTasks }}</div>
  </div>
</template>
