<template>
  <aside
    class="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full"
    :class="sidebarWidth"
  >
    <div class="flex flex-col h-full">
      <!-- Header (fixed) -->
      <div class="p-5 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <!-- <img
            src="@/assets/logo.svg"
            alt="TreeWeb"
            class="transition-all duration-300"
            :class="logoSize"
            v-if="isExpanded"
          /> -->
          <Button @click="toggleMenu" class="p-button-text p-button-rounded ml-auto" size="small">
            <img
              src="@/assets/roll-left.svg"
              :class="{ 'transform rotate-180': !isExpanded }"
              alt="Toggle menu"
            />
          </Button>
        </div>
      </div>

      <!-- Scrollable content -->
      <div
        class="flex-1 flex flex-col overflow-hidden"
        :class="{ hidden: !isExpanded, block: isExpanded }"
      >
        <div class="p-5 flex flex-col gap-5">
          <h2 class="heading-2">Последние сообщения</h2>

          <SelectButton v-model="selectedTab" optionLabel="name" :options="tabsOptions" />

          <Button
            class="w-full flex items-center gap-2 justify-start p-button-secondary min-h-[41px]"
          >
            <div class="w-6 h-6 bg-[--p-primary-500] rounded-full flex items-center justify-center">
              <i class="pi pi-plus text-white text-xs" />
            </div>
            <span class="button-2 text-[--p-text-muted-color]">Добавить новое</span>
          </Button>
        </div>

        <ScrollPanel style="height: 494px" class="mx-1">
          <div class="flex flex-col px-3" v-if="tasks.length > 0">
            <TaskCard v-for="task in tasks" :task="task" :key="task.id" />
          </div>
        </ScrollPanel>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Task } from '@/api/tasks/task.types';
import { TasksService } from '@/api/tasks/tasks.service';
import { useSettingsStore } from '@/stores/settings';

const isExpanded = ref(true);
const { t } = useI18n();

const settingsStore = useSettingsStore();

const selectedTab = ref({ id: 0, name: t('common.0') });
const tabsOptions = [
  { id: 0, name: t('common.0') },
  ...settingsStore.getSettingsByKey('types')?.map((type) => ({
    ...type,
    name: t(`common.${type.id}`),
  })),
];

const tasks = ref<Task[]>([]);

const loadTasks = async (typeId?: number): Promise<void> => {
  try {
    tasks.value = await TasksService.getTasks(typeId === 0 ? undefined : typeId);
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error);
  }
};

watch(selectedTab, (newValue) => {
  loadTasks(newValue.id);
});

onMounted(() => {
  loadTasks();

  window.addEventListener('task-created', () => {
    loadTasks(selectedTab.value.id);
  });
});

onUnmounted(() => {
  window.removeEventListener('task-created', () => {
    loadTasks(selectedTab.value.id);
  });
});

const sidebarWidth = computed(() => ({
  'w-[417px]': isExpanded.value,
  'w-20': !isExpanded.value,
}));

// const logoSize = computed(() => ({
//   'w-32': isExpanded.value,
//   'w-10': !isExpanded.value,
// }));

// Methods
const toggleMenu = (): void => {
  isExpanded.value = !isExpanded.value;
};
</script>
