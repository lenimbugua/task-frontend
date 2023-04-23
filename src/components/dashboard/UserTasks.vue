<script setup>
import { BarsArrowDownIcon } from "@heroicons/vue/24/outline";
import { useStatsStore } from "@/stores/stats";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const { getTotalDoneTasks } = useStatsStore();
const { totalUserTasks } = storeToRefs(useStatsStore());
const { user } = storeToRefs(useLoginStore());

const token = user.value.token;

getTotalDoneTasks(token);
</script>
<template>
  <div
    class="block shadow-lg rounded-md w-full p-1 space-y-2 bg-sky-500/20 text-sky-900"
  >
    <div>
      <BarsArrowDownIcon class="h-8 w-8" />
    </div>
    <div class="text-sm font-medium">Total Tasks</div>
    <div class="font-bold leading-5 text-4xl">{{ totalUserTasks }}</div>
  </div>
</template>
