<template>
  <div class="flex flex-col">
    <slot :inputClass="inputClass"></slot>
    <small class="text-red-400 dark:text-red-300 h-5 ml-10" :class="{ invisible: !showError }">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
  isDirty: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

const showError = computed(() => props.isDirty && props.hasError);

const inputClass = computed(() => ({
  'p-invalid': showError.value,
}));
</script>
