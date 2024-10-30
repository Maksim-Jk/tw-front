<template>
  <aside
    class="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 h-full"
    :class="sidebarWidth"
  >
    <div class="flex flex-col h-full">
      <!-- Header (fixed) -->
      <div class="p-5 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <img
            src="@/assets/logo.svg"
            alt="TreeWeb"
            class="transition-all duration-300"
            :class="logoSize"
            v-if="isExpanded"
          />
          <Button @click="toggleMenu" class="p-button-text p-button-rounded" size="small">
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
        class="flex-1 overflow-y-auto transition-opacity duration-300"
        :class="{ 'opacity-0': !isExpanded, 'opacity-100': isExpanded }"
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

          <div class="flex flex-col">
            <TaskCard v-for="task in tasks" :task="task" />
          </div>
        </div>
      </div>

      <!-- Footer (fixed) -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <NavigationList
          :items="footerItems"
          :is-expanded="isExpanded"
          @item-click="handleFooterAction"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toggleTheme } from '@/utils/themeToggle';
import { useAuth } from '@/composables/useAuth';
import { FOOTER_ITEMS } from '@/constants/navigation';
import type { MenuItem } from 'primevue/menuitem';
import type { Task } from '@/types/task';

const router = useRouter();
const isExpanded = ref(true);
const isDarkTheme = ref(document.documentElement.classList.contains('dark'));
const { t, locale } = useI18n();
const { logout } = useAuth();

const selectedTab = ref({ name: 'Option 1', value: 1 });
const tabsOptions = ref([
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
]);

const tasks = ref<Task[]>([
  {
    id: '1',
    title: 'Нужно поменять блоки местами',
    type: 'Задача',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet...',
    tags: ['COMPLETED', 'IN_PROGRESS', 'PENDING'],
    date: new Date(new Date().setDate(new Date().getDate() - 0.5)),
  },
  {
    id: '2',
    title: 'Добавить новый функционал',
    type: 'Задача',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet...',
    tags: ['COMPLETED'],
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: '3',
    title: 'Исправить баги в интерфейсе',
    type: 'Вопрос',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet...',
    tags: ['COMPLETED'],
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: '4',
    title: 'Оптимизировать производительность',
    type: 'Вопрос',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet...',
    tags: ['COMPLETED'],
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: '5',
    title: 'Обновить документацию',
    type: 'Задача',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet...',
    tags: ['COMPLETED'],
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: '6',
    title: 'Подготовить презентацию',
    type: 'Задача',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet...',
    tags: ['COMPLETED'],
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  },
]);

// Computed properties
const sidebarWidth = computed(() => ({
  'w-[417px]': isExpanded.value,
  'w-20': !isExpanded.value,
}));

const logoSize = computed(() => ({
  'w-32': isExpanded.value,
  'w-10': !isExpanded.value,
}));

const footerItems = computed(() =>
  FOOTER_ITEMS.map((item) => ({
    ...item,
    label: t(item.translationKey),
    icon: item.label === 'Theme' ? (isDarkTheme.value ? 'pi pi-moon' : 'pi pi-sun') : item.icon,
  }))
);

// Methods
const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};

const handleFooterAction = async (item: MenuItem) => {
  switch (item.translationKey) {
    case 'theme':
      toggleTheme();
      isDarkTheme.value = !isDarkTheme.value;
      break;
    case 'language':
      locale.value = locale.value === 'ru' ? 'en' : 'ru';
      break;
    case 'logout':
      await logout();
      router.push('/login');
      break;
  }
};
</script>
