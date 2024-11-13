<template>
  <div
    class="relative task-card p-[18px] hover:rounded-lg border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:border-transparent hover:bg-[--p-primary-50]"
  >
    <div class="p-card-header">
      <div class="flex justify-between items-center mb-3">
        <span class="caption-1 text-[--p-text-muted-color] uppercase">{{
          $t(`task.types.${task.type_id}`)
        }}</span>
        <div class="body-2">
          {{ formatDate(task.created_at) }}
        </div>
      </div>
      <div class="mb-3 flex gap-3 flex-wrap">
        <Tag
          :value="$t(`task.statuses.${task.status_id}`)"
          :severity="getStatusSeverity(task.status_id)"
        >
          <template #icon v-if="getStatusIcon(task.status_id)">
            <i :class="[getStatusIcon(task.status_id), 'status-icon']" />
          </template>
        </Tag>
        <Tag
          v-for="tag in task.flag_ids"
          :key="tag"
          :value="$t(`task.flags.${tag}`)"
          :severity="getFlagSeverity(tag)"
        />
      </div>

      <h3 class="mb-3 heading-3">{{ task.title }}</h3>
    </div>
    <div class="p-card-content">
      <p class="text-[--p-surface-400] line-clamp-2">{{ task.description }}</p>
    </div>
    <div class="p-card-footer">
      <div v-if="task.attachments" class="mt-3 flex gap-2 flex-wrap">
        <div class="flex items-center gap-2 text-[--p-text-muted-color]">
          <i class="pi pi-file text-[--p-text-muted-color] text-[16px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task, TaskFlags, TaskStatus } from '@/api/tasks/task.types';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useI18n } from 'vue-i18n';

interface Props {
  task: Task;
}

defineProps<Props>();

const { locale } = useI18n();

const getStatusSeverity = (status: TaskStatus): 'success' | 'info' | 'secondary' => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'success';
    case TaskStatus.IN_PROGRESS:
      return 'info';
    default:
      return 'secondary';
  }
};

const getFlagSeverity = (flag: TaskFlags): 'danger' | 'secondary' => {
  switch (flag) {
    case TaskFlags.URGENT:
      return 'danger';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: TaskStatus): string | null => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'pi pi-check';
    case TaskStatus.IN_PROGRESS:
      return 'pi pi-circle-fill';
    default:
      return null;
  }
};

const formatDate = (date: Date | string): string => {
  const dateObj = new Date(date);
  const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
  const localDate = new Date(dateObj.getTime() - timezoneOffset);
  const currentLocale = locale.value === 'ru' ? ru : enUS;

  if (isToday(localDate)) {
    return formatDistanceToNow(localDate, {
      locale: currentLocale,
      addSuffix: true,
    });
  }

  if (isYesterday(localDate)) {
    return format(localDate, "'вчера в' HH:mm", { locale: currentLocale });
  }

  return format(localDate, 'dd.MM.yyyy в HH:mm', { locale: currentLocale });
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
