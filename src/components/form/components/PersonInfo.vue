<template>
  <div class="flex flex-col gap-4">
    <FormField v-bind="getFieldProps(v$.personInfo, 'firstName')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
          <InputText
            v-model="personInfo.firstName"
            :placeholder="t('form.placeholders.firstName')"
            :class="inputClass"
            :disabled="isViewMode"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.personInfo, 'lastName')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
          <InputText
            v-model="personInfo.lastName"
            :placeholder="t('form.placeholders.lastName')"
            :class="inputClass"
            :disabled="isViewMode"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.personInfo, 'phone')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-phone"></i></InputGroupAddon>
          <InputText
            v-model="personInfo.phone"
            :placeholder="t('form.placeholders.phone')"
            :class="inputClass"
            :disabled="isViewMode"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.personInfo, 'email')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-envelope"></i></InputGroupAddon>
          <InputText
            v-model="personInfo.email"
            :placeholder="t('form.placeholders.email')"
            :class="inputClass"
            :disabled="isViewMode"
          />
        </InputGroup>
      </template>
    </FormField>
  </div>
</template>

<script lang="ts" setup>
import { useFormStore } from '@/stores/form';
import { getFieldProps } from '@/utils/formUtils';
import { useI18n } from 'vue-i18n';

defineProps({
  v$: { type: Object, required: true },
  isViewMode: { type: Boolean, required: true },
});

const { t } = useI18n();
const { personInfo } = useFormStore();
</script>
