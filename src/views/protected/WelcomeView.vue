<template>
  <div class="max-w-7xl mx-auto">
    <!-- Верхний баннер с приветствием -->
    <div class="overflow-hidden rounded-2xl pt-8 relative">
      <img
        src="@/assets/graphics/dashboard.svg"
        alt="Dashboard"
        class="absolute top-0 right-0 left-0 z-10 mx-auto"
      />

      <div class="relative bg-[#5673D9] rounded-2xl p-8 pt-12 mb-7">
        <div class="text-white z-30 relative max-w-[400px]">
          <h1 class="font-medium text-leading-[50%] text-[26px] mb-2 text-[var(--main-white)]">
            Здравствуйте,
            {{ userStore.state.name }}!
          </h1>
          <p class="font-medium text-[20px] leading-[145%] max-w-[310px] text-[#b6caf4]">
            Вы хотите задать вопрос или поставить задачу?
          </p>
        </div>
        <img
          src="@/assets/graphics/leaves.svg"
          alt="Leaves"
          class="absolute bottom-0 left-0 animate-sway"
        />
        <img
          src="@/assets/graphics/person.svg"
          alt="Person"
          class="absolute bottom-0 right-0 z-20 animate-sway"
        />
      </div>
    </div>
    <!-- Карточки действий -->
    <div class="flex gap-8">
      <router-link
        class="bg-white rounded-2xl p-8 flex flex-col items-center justify-center flex-1"
        :to="{ name: PROTECTED_ROUTES.CREATE_TASK }"
      >
        <div class="mb-4">
          <img src="@/assets/icons/task-icon.svg" alt="Task" />
        </div>
        <h3 class="font-medium text-[20px] leading-[145%] text-center">Поставить задачу</h3>
      </router-link>

      <router-link
        class="bg-white rounded-2xl p-8 flex flex-col items-center justify-center flex-1"
        :to="{ name: PROTECTED_ROUTES.CREATE_TASK }"
      >
        <div class="mb-4">
          <img src="@/assets/icons/question-icon.svg" alt="Question" />
        </div>
        <h3 class="font-medium text-[20px] leading-[145%] text-center">Задать вопрос</h3>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PROTECTED_ROUTES } from '@/router/routes';
import { useUserStore } from '@/stores/userStore/userStore';

const userStore = useUserStore();
</script>

<style scoped>
@keyframes sway {
  0%,
  100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

.animate-sway {
  animation: sway 3s ease-in-out infinite;
  transform-origin: bottom center;
}
</style>
