<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const SideNavigation = defineAsyncComponent(() => import('./components/SideNavigation.vue'));
</script>

<template>
  <div class="flex min-h-screen bg-slate-300">
    <div class="w-[1200px] h-[766px] mx-auto bg-slate-50 flex">
      <SideNavigation />
      <main class="flex-1 p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
