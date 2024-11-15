<template>
  <TaskForm v-if="taskData" mode="edit" :id="id" :key="id" :task="taskData" />
</template>

<script setup lang="ts">
import { TasksService } from '@/api/tasks/tasks.service';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);
const taskData = ref(null);

const loadTask = async (taskId: string) => {
  try {
    const task = await TasksService.getTask(taskId);
    taskData.value = task;
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};

onMounted(() => loadTask(id.value as string));

onBeforeRouteUpdate((to) => {
  id.value = to.params.id;
  loadTask(to.params.id as string);
});
</script>
