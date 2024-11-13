<template>
  <div class="mx-auto p-4 bg-white rounded-2xl">
    <form @submit.prevent="handleSubmit" class="">
      <!-- Тип и Приоритет -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField v-bind="getFieldProps(v$.taskData, 'type_id')">
          <template #label>{{ $t('task.form.type') }}</template>
          <template #default="{ inputClass }">
            <Select
              v-model="taskData.type_id"
              :options="taskTypes"
              placeholder="Выберите тип"
              :class="inputClass"
              :optionLabel="(option) => $t(`task.types.${option.id}`)"
              optionValue="id"
            />
          </template>
        </FormField>

        <FormField v-bind="getFieldProps(v$.taskData, 'priority_id')">
          <template #label>{{ $t('task.form.priority') }}</template>
          <template #default="{ inputClass }">
            <Select
              v-model="taskData.priority_id"
              :options="priorities"
              :class="inputClass"
              :optionLabel="(option) => $t(`task.priorities.${option.id}`)"
              optionValue="id"
              placeholder="Выберите приоритет"
            />
          </template>
        </FormField>
      </div>

      <!-- Область применения -->
      <div class="space-y-2 mb-4">
        <div class="flex gap-4">
          <label
            for="scope-global"
            :class="[
              'flex items-center rounded-lg px-5 py-3 flex-1 cursor-pointer',
              taskData.scope === 'global'
                ? 'bg-blue-50 border border-[#A4B8FE]'
                : 'hover:bg-gray-50 border border-[var(--p-surface-200)]',
            ]"
          >
            <RadioButton v-model="taskData.scope" value="global" inputId="scope-global" />
            <span
              class="ml-2"
              :class="taskData.scope === 'global' ? '' : 'text-[var(--p-surface-400)]'"
            >
              {{ $t('task.form.scope.global') }}
            </span>
          </label>

          <label
            for="scope-specific"
            :class="[
              'flex items-center rounded-lg px-5 py-3 flex-1 cursor-pointer',
              taskData.scope === 'specific'
                ? 'bg-blue-50 border border-[#A4B8FE]'
                : 'hover:bg-gray-50 border border-[var(--p-surface-200)]',
            ]"
          >
            <RadioButton v-model="taskData.scope" value="specific" inputId="scope-specific" />
            <span
              class="ml-2"
              :class="taskData.scope === 'specific' ? '' : 'text-[var(--p-surface-400)]'"
            >
              {{ $t('task.form.scope.specific') }}
            </span>
          </label>
        </div>

        <!-- Добавляем предупреждение -->
        <div v-if="taskData.scope === 'specific'">
          <Message severity="warn" size="large" class="mb-4 mt-4">
            {{ $t('task.form.scope.specificWarning') }}
          </Message>
        </div>
      </div>

      <!-- Тема -->
      <FormField v-bind="getFieldProps(v$.taskData, 'title')">
        <template #label>{{ $t('task.form.title') }}</template>
        <template #default="{ inputClass }">
          <InputText
            v-model="taskData.title"
            :placeholder="$t('task.form.titlePlaceholder')"
            :class="inputClass"
          />
        </template>
      </FormField>

      <!-- Детали задачи -->
      <FormField v-bind="getFieldProps(v$.taskData, 'description')">
        <template #label>{{ $t('task.form.description') }}</template>
        <template #default="{ inputClass }">
          <Editor
            v-model="taskData.description"
            editorStyle="height: 120px"
            :placeholder="$t('task.form.descriptionPlaceholder')"
            :class="inputClass"
          >
            <template v-slot:toolbar>
              <span class="ql-formats">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
              </span>
            </template>
          </Editor>
        </template>
      </FormField>

      <!-- Прикрепить файл -->
      <div class="flex justify-between">
        <FileUpload
          mode="basic"
          :auto="false"
          :chooseLabel="$t('task.form.attachFile')"
          @select="onFileSelect"
          :maxFileSize="5000000"
          class="p-fileupload-basic"
        >
          <template #chooseicon>
            <i class="pi pi-file-plus"></i>
          </template>
        </FileUpload>

        <Button type="submit" label="Отправить" class="w-32" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Editor from 'primevue/editor';
import { useSettingsStore } from '@/stores/settings';
import Message from 'primevue/message';
import useVuelidate from '@vuelidate/core';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { PROTECTED_ROUTES } from '@/router/routes';
import { getFieldProps } from '@/utils/formUtils';
import { required, minLength } from '@/utils/i18n-validators';
import { TasksService } from '@/api/tasks/tasks.service';

const settingsStore = useSettingsStore();
const taskData = ref({
  title: null,
  description: null,
  type_id: null,
  priority_id: null,
  scope: 'global',
  flag_ids: [],
  attachments: [] as File[],
});

const pageUrl = computed(() => {
  if (taskData.value.scope === 'specific') {
    return window.location.href;
  }
  return window.location.origin;
});

const rules = computed(() => ({
  taskData: {
    type_id: { required },
    priority_id: { required },
    title: { required, minLength: minLength(10) },
    description: { required, minLength: minLength(10) },
  },
}));

const toast = useToast();
const router = useRouter();
const { t } = useI18n();

const v$ = useVuelidate(rules, { taskData });

const taskTypes = computed(() => settingsStore.getSettingsByKey('types') as string[]);
const priorities = computed(() => settingsStore.getSettingsByKey('priorities') as string[]);

const handleSubmit = async (): Promise<void> => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    toast.add({
      severity: 'error',
      summary: t('form.submitErrorTitle'),
      detail: t('form.submitErrorMessage'),
      life: 3000,
    });
    return;
  }

  toast.add({
    severity: 'success',
    summary: t('form.submitSuccessTitle'),
    detail: t('form.submitSuccessMessage'),
    life: 3000,
  });

  TasksService.createTask({
    ...taskData.value,
    page_url: pageUrl.value,
  });

  router.push({ name: PROTECTED_ROUTES.MESSAGES });
};

const onFileSelect = (event: { files: File[] }): void => {
  const uploadedFiles = event.files;
  taskData.value.attachments.push(...uploadedFiles);
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */

:deep(.ql-editor.ql-blank::before) {
  font-style: normal !important;
  color: var(--p-surface-400) !important;
}
:deep(.ql-editor) {
  font-size: 15px !important;
}

:deep(.ql-formats .ql-fill) {
  fill: var(--p-surface-400) !important;
}

:deep(.ql-formats .ql-stroke) {
  stroke: var(--p-surface-400) !important;
}
</style>
