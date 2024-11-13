<template>
  <div class="flex justify-center items-center">
    <div class="card w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">{{ $t('auth.login') }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-4">
          <FormField v-bind="getFieldProps(v$, 'email')">
            <template #default="{ inputClass }">
              <InputGroup>
                <InputGroupAddon><i class="pi pi-envelope"></i></InputGroupAddon>
                <InputText
                  v-model="userData.email"
                  :placeholder="t('auth.emailPlaceholder')"
                  :class="inputClass"
                  autocomplete="username"
                />
              </InputGroup>
            </template>
          </FormField>

          <FormField v-bind="getFieldProps(v$, 'password')">
            <template #default="{ inputClass }">
              <InputGroup>
                <InputGroupAddon><i class="pi pi-lock"></i></InputGroupAddon>
                <Password
                  v-model="userData.password"
                  :placeholder="t('auth.passwordPlaceholder')"
                  :class="inputClass"
                  :feedback="false"
                  toggleMask
                  class="w-full"
                  autocomplete="current-password"
                />
              </InputGroup>
            </template>
          </FormField>

          <div class="flex items-center gap-2 mb-4">
            <Checkbox v-model="userData.remember" :binary="true" inputId="remember" />
            <label for="remember" class="text-sm">{{ $t('auth.rememberMe') }}</label>
          </div>

          <div class="flex flex-col gap-2">
            <Button type="submit" :loading="loading" class="w-full">
              {{ $t('auth.loginButton') }}
            </Button>
            <router-link to="/register" class="text-center text-sm text-blue-500">
              {{ $t('auth.noAccount') }}
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/api/auth/auth.service';
import { useI18n } from 'vue-i18n';
import { getFieldProps } from '@/utils/formUtils';
import { email, required } from '@/utils/i18n-validators';
import useVuelidate from '@vuelidate/core';
import { useUserStore } from '@/stores/userStore/userStore';
import { TokenService } from '@/services/token.service';
import { DEFAULT_ROUTE } from '@/router/routes';

const router = useRouter();
const { t } = useI18n();

const rules = {
  email: { required, email },
  password: { required },
};

const userData = ref({
  email: '',
  password: '',
  remember: false,
});

const v$ = useVuelidate(rules, userData);

const loading = ref(false);

const userStore = useUserStore();

const handleSubmit = async (): Promise<void> => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    loading.value = true;
    const response = await AuthService.login(userData.value.email, userData.value.password);

    TokenService.setToken(response);

    const tokenData = TokenService.getUserFromToken();

    if (tokenData) {
      userStore.setUser(tokenData);
      router.push(DEFAULT_ROUTE);
    } else {
      throw new Error('Invalid token data');
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
