<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { toggleTheme } from '../utils/themeToggle';

const isDarkTheme = ref(false);
const { locale } = useI18n();

const handleToggleTheme = () => {
  toggleTheme();
  isDarkTheme.value = !isDarkTheme.value;
};

const toggleLanguage = () => {
  locale.value = locale.value === 'ru' ? 'en' : 'ru';
};
</script>

<template>
  <main class="flex-grow flex items-center justify-center px-4">
    <div class="absolute top-5 right-5 flex justify-end p-4">
      <div class="flex gap-2">
        <Button :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" @click="handleToggleTheme" />
        <Button icon="pi pi-globe" @click="toggleLanguage()" />
      </div>
    </div>

    <RouterView />
  </main>
</template>
