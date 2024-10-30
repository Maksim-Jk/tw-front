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
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@/utils/i18n-validators';
import { useAuth } from '@/composables/useAuth';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { DEFAULT_ROUTE } from '@/router/routes';
import { useI18n } from 'vue-i18n';
import { getFieldProps } from '@/utils/formUtils';

const router = useRouter();
const toast = useToast();
const { t } = useI18n();
const auth = useAuth();

const userData = ref({
  email: '',
  password: '',
  remember: false,
});

const loading = ref(false);

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, userData);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  loading.value = true;
  try {
    await auth.login(userData.value.email, userData.value.password);
    toast.add({
      severity: 'success',
      summary: t('auth.loginSuccess'),
      life: 3000,
    });
    router.push({ name: DEFAULT_ROUTE });
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: t('auth.loginError'),
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
