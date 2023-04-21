<script setup>
import { useRouter } from "vue-router";
import {
  UserGroupIcon,
  QueueListIcon,
  ChartPieIcon,
  CheckBadgeIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();

const activeClass = (routeName) => {
  if (router.currentRoute.value.name === routeName) {
    return "bg-white text-teal-900";
  }
  return "";
};
</script>
<template>
  <div
    class="fixed w-52 left-0 top-0 bottom-0 border-r bg-sky-700 overflow-scroll"
  >
    <div class="w-full p-3 italic text-white text-2xl mx-auto">
      Manage Tasks
    </div>
    <nav class="block space-y-3 text-teal-100 p-5">
      <RouterLink
        to="/dashboard"
        class="cursor-pointer text-sm flex items-center space-x-2 hover:bg-white/50 hover:text-teal-50 p-1 rounded-md"
        :class="activeClass('dashboard')"
      >
        <ChartPieIcon class="h-7 w-7" />
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink
        to="/users"
        class="cursor-pointer text-sm flex items-center space-x-2 hover:bg-white/50 hover:text-teal-50 p-1 rounded-md"
        :class="activeClass('users')"
      >
        <UserGroupIcon class="h-7 w-7" />
        <span>Users</span>
      </RouterLink>
      <RouterLink
        to="/tasks"
        class="cursor-pointer text-sm flex space-x-2 items-center hover:bg-white/50 hover:text-teal-50 p-1 rounded-md"
        :class="activeClass('tasks')"
      >
        <QueueListIcon class="h-7 w-7" />
        <span>Tasks</span>
      </RouterLink>
      <RouterLink
        to="/status"
        class="cursor-pointer text-sm flex items-center space-x-2 hover:bg-white/50 hover:text-teal-50 p-1 rounded-md"
        :class="activeClass('status')"
      >
        <CheckBadgeIcon class="h-7 w-7" />
        <span>Status</span>
      </RouterLink>
    </nav>
  </div>
</template>
