<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toggleTheme } from '../utils/themeToggle';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';

const { locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'ru' ? 'en' : 'ru';
};

const isDarkTheme = ref(false);

onMounted(() => {
  isDarkTheme.value = document.documentElement.classList.contains('dark');
});

const handleToggleTheme = () => {
  toggleTheme();
  isDarkTheme.value = !isDarkTheme.value;
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Toast />
    <header class="flex justify-end p-4">
      <div class="flex gap-2">
        <Button :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" @click="handleToggleTheme" />
        <Button icon="pi pi-globe" @click="toggleLanguage()" />
      </div>
    </header>

    <main class="flex-grow flex items-center justify-center px-4">
      <RouterView />
    </main>
  </div>
</template>
