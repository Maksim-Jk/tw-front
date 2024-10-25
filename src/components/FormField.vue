<template>
  <div class="flex flex-col gap-2">
    <slot :inputClass="inputClass"></slot>
    <small class="text-red-500" v-if="showError">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

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
})

const showError = computed(() => props.isDirty && props.hasError)

const inputClass = computed(() => ({
  'p-invalid': showError.value,
}))
</script>
