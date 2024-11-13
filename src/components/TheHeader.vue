<template>
  <header>
    <div class="max-w-7xl mx-auto flex justify-between items-center mb-8">
      <h1
        v-if="$route.meta.title"
        class="font-family-second text-[26px] font-medium leading-[131%] text-black"
      >
        {{ $t($route.meta.title) || 'Заголовок' }}
      </h1>
      <div v-else></div>

      <div class="flex items-center gap-5">
        <!-- Кнопка создания задачи -->
        <Button
          rounded
          severity="primary"
          aria-label="Создать задачу"
          size="small"
          class="w-6 h-6"
          @click="createTask"
        >
          <i class="pi pi-plus" style="font-size: 12px"></i>
        </Button>

        <!-- Уведомления -->
        <OverlayBadge :value="notificationCount.toString()" severity="danger">
          <Button
            icon="pi pi-bell"
            text
            rounded
            severity="secondary"
            aria-label="Уведомления"
            @click="toggleNotifications"
            class="p-button-lg"
          >
            <i class="pi pi-bell" style="font-size: 24px"></i>
          </Button>
        </OverlayBadge>
        <Menu ref="notificationMenu" :model="notificationItems" :popup="true" />

        <!-- Профиль -->
        <Button
          text
          rounded
          severity="secondary"
          class="flex items-center gap-4"
          @click="toggleProfile"
        >
          <Avatar
            :image="userStore.state.avatar"
            style="
              background-color: #d9eefd;
              color: #67c8ff;
              outline: 2px solid #67c8ff;
              outline-offset: 4px;
            "
            icon="pi pi-user"
            size="normal"
            shape="circle"
          />
          <i class="pi pi-chevron-down"></i>
        </Button>
        <Menu ref="profileMenu" :model="profileItems" :popup="true" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore/userStore';
import { ref } from 'vue';
import { useRouter, type NavigationFailure } from 'vue-router';
import { TokenService } from '@/services/token.service';
import { PROTECTED_ROUTES, ROUTES } from '@/router/routes';

const router = useRouter();
const notificationMenu = ref();
const profileMenu = ref();
const notificationCount = ref(3); // Пример количества уведомлений
const userStore = useUserStore();

const notificationItems = [
  {
    label: 'Уведомления',
    items: [
      {
        label: 'Новая задача назначена',
        icon: 'pi pi-check-circle',
        command: (): void => {
          // Обработка клика по уведомлению
        },
      },
      {
        label: 'Дедлайн через 2 часа',
        icon: 'pi pi-clock',
        command: (): void => {
          // Обработка клика по уведомлению
        },
      },
    ],
  },
];

const profileItems = [
  {
    label: userStore.state.name,
    icon: 'pi pi-user',
    command: (): Promise<void | NavigationFailure> => router.push('/profile'),
  },
  {
    label: 'Настройки',
    icon: 'pi pi-cog',
    command: (): Promise<void | NavigationFailure> => router.push('/settings'),
  },
  {
    separator: true,
  },
  {
    label: 'Выйти',
    icon: 'pi pi-sign-out',
    command: (): void => {
      TokenService.removeToken();
      router.push({ name: ROUTES.LOGIN });
    },
  },
];

const createTask = (): void => {
  router.push({ name: PROTECTED_ROUTES.CREATE_TASK });
};

const toggleNotifications = (event: MouseEvent): void => {
  notificationMenu.value.toggle(event);
};

const toggleProfile = (event: MouseEvent): void => {
  profileMenu.value.toggle(event);
};
</script>

<style scoped>
:deep(.p-menu) {
  right: 0;
  left: auto !important;
}
</style>
