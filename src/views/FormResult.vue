<template>
  <div class="card">
    <h2 class="text-2xl font-bold mb-4">{{ $t('formResult.title') }}</h2>
    <div class="mt-4">
      <Button @click="goBack" class="p-button-secondary mr-2">
        {{ $t('formResult.backToList') }}
      </Button>
      <Button v-if="isViewMode" @click="editForm" class="p-button-primary">
        {{ $t('formResult.edit') }}
      </Button>
    </div>
    <div v-if="formData">
      <Form :isViewMode="isViewMode" />
    </div>
    <div v-else>
      <Message severity="info" :closable="false">{{ $t('formResult.noData') }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFormStorage } from '@/composables/useFormStorage';
import { useI18n } from 'vue-i18n';
import { useFormStore } from '@/stores/form';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const formStore = useFormStore();

const { getFormById } = useFormStorage();

const formData = ref<any>(null);
const isViewMode = ref(true);

onMounted(() => {
  const formId = Number(route.params.id);
  const isViewModeQuery = route.query.isViewMode;
  if (isViewModeQuery) {
    isViewMode.value = isViewModeQuery === 'true';
  }
  formData.value = getFormById(formId);
  if (formData.value) {
    formStore.setFormData(formData.value);
  }
});

const goBack = () => {
  router.push({ name: 'home' });
};

const editForm = () => {
  isViewMode.value = false;
};
</script>
