<template>
  <div class="flex min-h-screen bg-slate-300 items-center">
    <Toast />
    <div
      class="w-[1200px] h-[766px] mx-auto bg-white dark:bg-gray-800 flex overflow-hidden relative"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
