<script setup>
import TasksBarChart from "../components/dashboard/TasksBarChart.vue";
import TasksLineChart from "../components/dashboard/TasksLineChart.vue";
import PieChart from "../components/dashboard/PieChart.vue";
import TotalUsers from "../components/dashboard/TotalUsers.vue";
import UserTask from "../components/dashboard/UserTasks.vue";
import TotalCompletedTasks from "../components/dashboard/TotalCompletedTasks.vue";
import TotalInProgress from "../components/dashboard/TotalInProgress.vue";
import TotalExpiredTasks from "../components/dashboard/TotalExpiredTasks.vue";
</script>
<template>
  <div class="px-4 py-3">
    <div class="text-sm text-sky-500 mb-3">Reports</div>
    <div class="flex mb-6 py-4 gap-6 overflow-scroll">
      <TotalUsers />
      <UserTask />
      <TotalCompletedTasks />
      <TotalInProgress />
      <TotalExpiredTasks />
    </div>

    <div class="flex w-full">
      <div
        class="flex justify-start w-3/4 mt-6 shadow-md border overflow-hidden bg-white"
      >
        <div class="col-span-2 bg-white rounded-md py-3 px-4">
          <div class="text-md text-sky-500 font-medium font-gotham">Tasks</div>
          <TasksBarChart />
        </div>
      </div>
      <div
        class="flex justify-start w-full mt-6 shadow-md border overflow-hidden bg-white"
      >
        <div class="col-span-2 bg-white rounded-md py-3 px-4">
          <div class="text-md text-sky-500 font-medium font-gotham">
            Summary
          </div>
          <PieChart />
        </div>
      </div>
    </div>
    <div
      class="flex justify-start w-full mt-6 shadow-md border overflow-hidden bg-white"
    >
      <div class="col-span-2 w-full bg-white rounded-md py-3 px-4">
        <div class="text-md w-full text-sky-500 font-medium font-gotham">
          <TasksLineChart />
        </div>
      </div>
    </div>
  </div>
</template>
