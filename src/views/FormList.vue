<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { useFormStorage } from '@/composables/useFormStorage';
import { PROTECTED_ROUTES } from '@/router/routes';

const router = useRouter();
const { getSubmittedForms } = useFormStorage();

const submittedForms = ref(getSubmittedForms());

onMounted(() => {
  submittedForms.value = getSubmittedForms();
});

const viewForm = (index: number) => {
  router.push({ name: 'FormResultDetails', params: { id: index } });
};

const goToForm = () => {
  router.push({ name: 'form' });
};

const actionBodyTemplate = (slotProps: any) => {
  return { id: slotProps.data.id };
};

const editForm = (index: number) => {
  router.push({
    name: PROTECTED_ROUTES.FORM_RESULT,
    params: { id: index },
    query: { isViewMode: 'false' },
  });
};
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-4">{{ $t('home.title') }}</h1>
    <div v-if="submittedForms.length > 0">
      <h2 class="text-xl font-semibold mb-2">
        {{ $t('home.submittedForms') }}
      </h2>
      <DataTable :value="submittedForms" responsiveLayout="scroll">
        <Column field="id" :header="$t('formResult.id')"></Column>
        <Column field="personInfo.firstName" :header="$t('formResult.firstName')"></Column>
        <Column field="personInfo.lastName" :header="$t('formResult.lastName')"></Column>
        <Column field="personInfo.email" :header="$t('formResult.email')"></Column>
        <Column field="savedAt" :header="$t('formResult.savedAt')"></Column>
        <Column :header="$t('formResult.actions')" :body="actionBodyTemplate">
          <template #body="slotProps">
            <Button @click="viewForm(slotProps.data.id)" class="p-button-sm mr-2">
              {{ $t('formResult.view') }}
            </Button>
            <Button @click="editForm(slotProps.data.id)" class="p-button-sm p-button-secondary">
              {{ $t('formResult.edit') }}
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-else class="text-center text-gray-500 mt-4">
      {{ $t('home.noSubmittedForms') }}
    </div>
    <div class="mt-8">
      <Button @click="goToForm" class="p-button-primary">
        {{ $t('home.createNewForm') }}
      </Button>
    </div>
  </main>
</template>
