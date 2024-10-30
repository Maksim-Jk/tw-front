<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toggleTheme } from '../utils/themeToggle';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Toast from 'primevue/toast';
import router from '@/router';
import { useAuth } from '@/composables/useAuth';

const { t, locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'ru' ? 'en' : 'ru';
};

const navItems =
  router.options.routes
    .find((route) => route.meta?.requiresAuth)
    ?.children?.filter((route) => route.meta?.showInNav)
    .map((route) => ({
      path: route.path,
      name: t(route.meta.title as string),
    })) || [];

const isDarkTheme = ref(false);

onMounted(() => {
  isDarkTheme.value = document.documentElement.classList.contains('dark');
});

const handleToggleTheme = () => {
  toggleTheme();
  isDarkTheme.value = !isDarkTheme.value;
};

const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Toast />
    <header class="flex justify-between items-center p-4">
      <nav class="flex gap-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="transition-colors duration-300 hover:text-[var(--p-primary-color)]"
          active-class="text-[var(--p-primary-color)]"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="flex gap-2">
        <Button :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" @click="handleToggleTheme" />
        <Button icon="pi pi-globe" @click="toggleLanguage()" />
        <Button icon="pi pi-sign-out" @click="handleLogout" />
      </div>
    </header>

    <main class="flex-grow px-4">
      <RouterView />
    </main>
  </div>
</template>
