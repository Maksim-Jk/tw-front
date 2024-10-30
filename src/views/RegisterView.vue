<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <div class="card w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">{{ $t('auth.register') }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-4">
          <FormField v-bind="getFieldProps(v$, 'email')">
            <template #default="{ inputClass }">
              <InputGroup>
                <InputGroupAddon><i class="pi pi-envelope"></i></InputGroupAddon>
                <InputText
                  v-model="emailField"
                  :placeholder="t('auth.emailPlaceholder')"
                  :class="inputClass"
                />
              </InputGroup>
            </template>
          </FormField>

          <FormField v-bind="getFieldProps(v$, 'password')">
            <template #default="{ inputClass }">
              <InputGroup>
                <InputGroupAddon><i class="pi pi-lock"></i></InputGroupAddon>
                <Password
                  v-model="passwordField"
                  :placeholder="t('auth.passwordPlaceholder')"
                  :class="inputClass"
                  :feedback="true"
                  toggleMask
                  class="w-full"
                />
              </InputGroup>
            </template>
          </FormField>

          <FormField v-bind="getFieldProps(v$, 'confirmPassword')">
            <template #default="{ inputClass }">
              <InputGroup>
                <InputGroupAddon><i class="pi pi-lock"></i></InputGroupAddon>
                <Password
                  v-model="confirmPasswordField"
                  :placeholder="t('auth.confirmPasswordPlaceholder')"
                  :class="inputClass"
                  :feedback="false"
                  toggleMask
                  class="w-full"
                />
              </InputGroup>
            </template>
          </FormField>

          <div class="flex flex-col gap-2">
            <Button type="submit" :loading="loading" class="w-full">
              {{ $t('auth.registerButton') }}
            </Button>
            <router-link to="/login" class="text-center text-sm text-blue-500">
              {{ $t('auth.haveAccount') }}
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
import { required, email, minLength, sameAs } from '@/utils/i18n-validators';
import { useAuth } from '@/composables/useAuth';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getFieldProps } from '@/utils/formUtils';

const router = useRouter();
const toast = useToast();
const { t } = useI18n();
const auth = useAuth();

const emailField = ref('');
const passwordField = ref('');
const confirmPasswordField = ref('');
const loading = ref(false);

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAs: sameAs(passwordField) },
};

const v$ = useVuelidate(rules, {
  email: emailField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  loading.value = true;
  try {
    await auth.register(emailField.value, passwordField.value);
    toast.add({
      severity: 'success',
      summary: t('auth.registerSuccess'),
      life: 3000,
    });
    router.push('/');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('auth.registerError'),
      detail: error.message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
