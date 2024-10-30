<template>
  <aside
    class="h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300"
    :class="{ 'w-[250px]': isExpanded, 'w-20': !isExpanded }"
  >
    <div class="flex flex-col h-full">
      <!-- Шапка с логотипом и кнопкой -->
      <div class="flex items-center p-4 justify-between">
        <img
          src="@/assets/logo.svg"
          alt="TreeWeb"
          class="transition-all duration-300"
          :class="{ 'w-32': isExpanded, 'w-10': !isExpanded }"
        />
        <Button @click="toggleMenu" class="p-button-text p-button-rounded" size="small">
          <img
            src="@/assets/roll-left.svg"
            :class="{ 'transform rotate-180': !isExpanded }"
            alt="Toggle menu"
          />
        </Button>
      </div>

      <!-- Навигационное меню -->
      <nav class="mt-6">
        <ul class="space-y-2 px-3">
          <li v-for="item in menuItems" :key="item.label">
            <a
              @click="item.command"
              class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
            >
              <i :class="[item.icon, 'text-lg']"></i>
              <span v-if="isExpanded" class="ml-3 transition-opacity duration-300">{{
                item.label
              }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isExpanded = ref(true);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};

const menuItems = ref([
  {
    label: 'Главная',
    icon: 'pi pi-home',
    command: () => router.push('/'),
  },
  {
    label: 'Регистрация',
    icon: 'pi pi-user-plus',
    command: () => router.push('/register'),
  },
  {
    label: 'Список форм',
    icon: 'pi pi-list',
    command: () => router.push('/form-list'),
  },
]);

defineOptions({
  name: 'SideNavigation',
});
</script>
