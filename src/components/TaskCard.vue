<template>
  <RouterLink :to="{ name: PROTECTED_ROUTES.EDIT_TASK, params: { id: task.id } }">
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
        <p
          class="text-[--p-surface-400] line-clamp-2"
          v-html="task.description.replace(/<[^>]*>/g, '')"
        ></p>
      </div>
      <div class="p-card-footer">
        <div v-if="task.file" class="mt-3 flex gap-2 flex-wrap">
          <div class="flex items-center gap-2 text-[--p-text-muted-color]">
            <i class="pi pi-file text-[--p-text-muted-color] text-[16px]" />
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Task } from '@/api/tasks/task.types';
import { PROTECTED_ROUTES } from '@/router/routes';
import { useI18n } from 'vue-i18n';
import {
  getStatusSeverity,
  getFlagSeverity,
  getStatusIcon,
  formatTaskDate,
} from '@/helpers/task.helper';

interface Props {
  task: Task;
}

defineProps<Props>();

const { locale } = useI18n();

const formatDate = (date: Date | string): string => {
  return formatTaskDate(date, locale.value);
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
