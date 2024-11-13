<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SettingsService } from '@/api/settings/settings.service';
import { TokenService } from '@/services/token.service';
import { useUserStore } from '@/stores/userStore/userStore';
import { ROUTES } from '@/router/routes';

const userStore = useUserStore();
const router = useRouter();
const isLoading = ref(true);

const initializeApp = async (): Promise<void> => {
  try {
    if (TokenService.isTokenValid()) {
      const userData = TokenService.getUserFromToken();
      if (userData) {
        userStore.setUser(userData);
      }
    } else {
      TokenService.removeToken();
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    await SettingsService.getSettings();
    await initializeApp();
  } catch (error) {
    console.error('Ошибка инициализации:', error);
    router.push({ name: ROUTES.LOGIN });
  }
});
</script>

<template>
  <p v-if="isLoading">loading</p>
  <div v-else class="min-h-full flex w-full">
    <SideNavigation />
    <div class="flex-1 bg-surface-50">
      <TheHeader class="px-8 pt-6" />
      <ScrollPanel style="height: 662px">
        <div class="px-8 pb-6">
          <RouterView />
        </div>
      </ScrollPanel>
    </div>
  </div>
</template>
