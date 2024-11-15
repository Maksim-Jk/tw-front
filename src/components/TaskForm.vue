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

        <div>
          <Message severity="secondary" size="large" class="mb-4 mt-4">
            {{ $t('task.form.scope.currentUrl') }}: {{ pageUrl }}
          </Message>
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
            ref="editorRef"
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

        <!-- Добавляем кнопки для режима редактирования -->
        <div v-if="props.mode === 'edit' && taskData.file" class="flex gap-2">
          <Button icon="pi pi-download" severity="secondary" @click="downloadAttachment" />
          <Button icon="pi pi-trash" severity="danger" @click="deleteAttachment" />
        </div>

        <Button type="submit" label="Отправить" class="w-32" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
import { useRouter } from 'vue-router';
import { Task } from '@/api/tasks/task.types';

const settingsStore = useSettingsStore();
const toast = useToast();
const router = useRouter();
const { t } = useI18n();

const props = defineProps<{
  mode: 'create' | 'edit';
  id?: string;
  task?: Task;
}>();

const taskData = ref({
  title: null,
  description: null,
  type_id: null,
  priority_id: null,
  scope: 'global',
  flag_ids: [],
  file: null as File | null,
});

const pageUrlDto = ref(null);

const pageUrl = computed(() => {
  if (taskData.value.scope === null) {
    return pageUrlDto.value;
  }

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

  if (props.mode === 'create') {
    await TasksService.createTask({
      ...taskData.value,
      page_url: pageUrl.value,
      project_id: settingsStore.getSettingsByKey('project_id') as number,
    });
  }

  if (props.mode === 'edit') {
    await TasksService.updateTask(String(props.id), {
      ...taskData.value,
      page_url: pageUrl.value,
      project_id: settingsStore.getSettingsByKey('project_id') as number,
    });
  }

  window.dispatchEvent(new CustomEvent('task-created'));

  toast.add({
    severity: 'success',
    summary: t('form.submitSuccessTitle'),
    detail: t('form.submitSuccessMessage'),
    life: 3000,
  });

  router.push({ name: PROTECTED_ROUTES.MESSAGES });
};

const onFileSelect = (event: { files: File[] }): void => {
  const [uploadedFile] = event.files;
  taskData.value.file = uploadedFile;
};

const editorRef = ref(null);

const setEditorContent = (content: string) => {
  if (editorRef.value && editorRef.value.quill) {
    editorRef.value.quill.setText('');
    editorRef.value.quill.clipboard.dangerouslyPasteHTML(content || '');
  }
};

onMounted(async () => {
  console.log('onMounted');

  if (props.mode === 'edit') {
    try {
      taskData.value = {
        title: props.task.title,
        description: props.task.description,
        type_id: props.task.type_id,
        priority_id: props.task.priority_id,
        scope: getScope(props.task.page_url),
        flag_ids: props.task.flag_ids,
        file: props.task.file,
      };

      setTimeout(() => {
        setEditorContent(props.task.description);
      }, 100);

      pageUrlDto.value = props.task.page_url;
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  }
});

const getScope = (url: string): string => {
  if (url === window.location.origin) {
    return 'global';
  }

  if (url === window.location.href) {
    return 'specific';
  }

  return null;
};

const downloadAttachment = () => {
  // Логика скачивания файла
};

const deleteAttachment = () => {
  taskData.value.file = null;
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
