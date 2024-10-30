<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation';
import SideNavigation from '@/components/SideNavigation.vue';
import Toast from 'primevue/toast';
</script>

<template>
  <div class="min-h-full flex">
    <Toast />
    <SideNavigation />
    <RouterView />
  </div>
</template>
