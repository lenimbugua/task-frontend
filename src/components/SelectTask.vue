<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";
import { useTaskStore } from "../stores/tasks";
import { onBeforeUnmount, ref } from "vue";

const { user } = storeToRefs(useLoginStore());
const { tasks } = storeToRefs(useTaskStore());

const selectedTask = ref("Select task");

const { fetchTasks, setSelectedTask, resetSelectedTask } = useTaskStore();

fetchTasks(user.value.token);

const handleSelectTask = () => {
  console.log(selectedTask.value);
  setSelectedTask(selectedTask.value);
};

onBeforeUnmount(() => {
  resetSelectedTask();
});
</script>

<template>
  <select id="task" v-model="selectedTask" @change="handleSelectTask()">
    <option v-for="task in tasks" :key="task.id" :value="task.id">
      {{ task.name }}
    </option>
  </select>
</template>
