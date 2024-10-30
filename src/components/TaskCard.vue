<template>
  <div
    class="task-card pb-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:border-none hover:bg-[--p-primary-50] p-[18px] rounded-lg"
  >
    <div class="p-card-header">
      <div class="flex justify-between items-center mb-3">
        <span class="caption-1 text-[--p-text-muted-color] uppercase">{{ task.type }}</span>
        <div class="body-2">
          {{ formatDate(task.date) }}
        </div>
      </div>
      <div class="mb-3 flex gap-3">
        <Tag v-for="tag in task.tags" :value="tag" :severity="getStatusSeverity(tag)">
          <template #icon>
            <i v-if="getStatusIcon(tag)" :class="[getStatusIcon(tag), 'status-icon']" />
          </template>
        </Tag>
      </div>

      <h3 class="mb-3 heading-3">{{ task.title }}</h3>
    </div>
    <div class="p-card-content">
      <p class="text-gray-700">{{ task.description }}</p>
    </div>
    <div class="p-card-footer"></div>
  </div>
</template>

<script setup lang="ts">
import type { Task, TaskStatus } from '@/types/task';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

defineEmits<{
  (e: 'edit', task: Task): void;
  (e: 'delete', id: string): void;
}>();

const getStatusSeverity = (status: TaskStatus) => {
  switch (status) {
    case 'COMPLETED':
      return 'success';
    case 'IN_PROGRESS':
      return 'warning';
    case 'PENDING':
      return 'info';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case 'COMPLETED':
      return 'pi pi-check';
    case 'IN_PROGRESS':
      return 'pi pi-circle-fill';
    default:
      return null;
  }
};

const formatDate = (date: Date | string) => {
  const dateObj = new Date(date);

  if (isToday(dateObj)) {
    return formatDistanceToNow(dateObj, { locale: ru, addSuffix: true });
  }

  if (isYesterday(dateObj)) {
    return `вчера в ${format(dateObj, 'HH:mm')}`;
  }

  return format(dateObj, 'dd.MM.yyyy в HH:mm');
};
</script>

<style scoped>
.status-icon {
  font-size: 10px;
  width: 10px;
  height: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
