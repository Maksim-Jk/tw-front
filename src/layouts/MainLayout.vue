<script setup lang="ts">
import { toggleTheme } from '../utils/themeToggle'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import Toast from 'primevue/toast'

const { t, locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Toast />
    <header class="flex justify-between items-center p-4">
      <nav class="flex gap-4">
        <RouterLink
          to="/"
          class="transition-colors duration-300 hover:text-[var(--p-primary-color)]"
          >{{ t('home') }}</RouterLink
        >
        <RouterLink
          to="/about"
          class="transition-colors duration-300 hover:text-[var(--p-primary-color)]"
          >{{ t('about') }}</RouterLink
        >
      </nav>
      <div class="flex gap-2">
        <Button label="Toggle Dark Mode" @click="toggleTheme()" />
        <Button :label="t('toggleLanguage')" @click="toggleLanguage()" />
      </div>
    </header>

    <main class="flex-grow px-4">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
nav a.router-link-active {
  @apply text-[var(--p-primary-color)];
}
</style>
