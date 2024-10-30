<template>
  <Form :isViewMode="isViewMode" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFormStore } from '@/stores/form';
import { useFormStorage } from '@/composables/useFormStorage';
import { IFormData } from '@/stores/form';

const route = useRoute();
const formStore = useFormStore();
const { getFormById } = useFormStorage();

const isViewMode = ref(false);

onMounted(() => {
  const formId = route.params.id;
  if (formId) {
    isViewMode.value = true;
    const formData = getFormById(Number(formId));
    if (formData) {
      formStore.setFormData(formData as IFormData);
    }
  }
});
</script>
