<template>
  <div class="mx-auto p-4 bg-white rounded-2xl">
    <div class="flex justify-between">
      <div class="file-upload">
        <input
          type="file"
          @change="onFileSelect"
          class="hidden"
          ref="fileInput"
          :accept="acceptedFileTypes"
        />
        <button
          @click="triggerFileInput"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <i class="fas fa-file-plus"></i>
          Прикрепить файл
        </button>
      </div>

      <div v-if="selectedFile" class="flex gap-2">
        <button
          @click="uploadFile"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <i class="fas fa-upload"></i>
        </button>
        <button
          @click="downloadFile"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <i class="fas fa-download"></i>
        </button>
        <button
          @click="deleteFile"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <div
      v-if="toast.show"
      :class="[
        'fixed top-4 right-4 p-4 rounded',
        toast.severity === 'success' ? 'bg-green-500' : 'bg-red-500',
        'text-white',
      ]"
    >
      <p class="font-bold">{{ toast.summary }}</p>
      <p>{{ toast.detail }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { apiService } from '@/api/api.service';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const acceptedFileTypes = '.doc,.docx,.pdf,.txt'; // Укажите нужные типы файлов

const toast = reactive({
  show: false,
  severity: '',
  summary: '',
  detail: '',
});

const showToast = (severity: string, summary: string, detail: string) => {
  toast.severity = severity;
  toast.summary = summary;
  toast.detail = detail;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFileSelect = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file.size > 5000000) {
      showToast('error', 'Ошибка', 'Файл слишком большой (максимум 5MB)');
      return;
    }
    selectedFile.value = file;
  }
};

const uploadFile = async () => {
  if (selectedFile.value) {
    const formData = new FormData();

    formData.append('file', selectedFile.value);

    try {
      await apiService.post('/v1/tasks/test-upload', formData);
      showToast('success', 'Успешно', 'Файл успешно загружен');
    } catch (error) {
      showToast('error', 'Ошибка', 'Не удалось загрузить файл');
      console.error('Ошибка при загрузке файла:', error);
    }
  }
};

const downloadFile = () => {
  if (selectedFile.value) {
    // Здесь логика скачивания файла
    const url = URL.createObjectURL(selectedFile.value);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.value.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

const deleteFile = () => {
  selectedFile.value = null;
};
</script>
