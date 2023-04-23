<script setup>
import { UserGroupIcon } from "@heroicons/vue/24/outline";
import { useStatsStore } from "@/stores/stats";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const { getTotalUsers } = useStatsStore();
const { totalUsers } = storeToRefs(useStatsStore());
const { user } = storeToRefs(useLoginStore());

const token = user.value.token;

getTotalUsers(token);
</script>
<template>
  <div
    class="block shadow-lg rounded-md w-full p-1  space-y-2 bg-teal-500/70 text-teal-50"
  >
    <div>
      <UserGroupIcon class="h-8 w-8" />
    </div>
    <div class="text-sm font-medium">Registered Users</div>
    <div class="font-bold leading-5 text-4xl">{{ totalUsers }}</div>
  </div>
</template>
