<template>
  <ul class="space-y-2">
    <li v-for="item in items" :key="item.translationKey">
      <a
        @click="handleClick(item)"
        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
      >
        <i :class="item.icon"></i>
        <span v-if="isExpanded" class="ml-3">{{ item.label }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types/navigation';

defineProps<{
  items: MenuItem[];
  isExpanded: boolean;
}>();

const emit = defineEmits<{
  (e: 'itemClick', item: MenuItem): void;
}>();

const handleClick = (item: MenuItem) => {
  if (item.command) {
    item.command();
  } else {
    emit('itemClick', item);
  }
};
</script>
