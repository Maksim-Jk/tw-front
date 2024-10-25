<template>
  <div class="flex flex-col gap-4">
    <FormField v-bind="getFieldProps(v$.jobInfo, 'jobTitle')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-briefcase"></i></InputGroupAddon>
          <InputText
            v-model="jobInfo.jobTitle"
            :placeholder="t('form.placeholders.jobTitle')"
            :class="inputClass"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.jobInfo, 'company')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-building"></i></InputGroupAddon>
          <InputText
            v-model="jobInfo.company"
            :placeholder="t('form.placeholders.company')"
            :class="inputClass"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.jobInfo, 'startDate')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-calendar"></i></InputGroupAddon>
          <DatePicker
            v-model="jobInfo.startDate"
            :placeholder="t('form.placeholders.startDate')"
            :class="inputClass"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.jobInfo, 'location')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-map-marker"></i></InputGroupAddon>
          <InputText
            v-model="jobInfo.location"
            :placeholder="t('form.placeholders.location')"
            :class="inputClass"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.jobInfo, 'salary')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-dollar"></i></InputGroupAddon>
          <InputNumber
            v-model="jobInfo.salary"
            :placeholder="t('form.placeholders.salary')"
            mode="currency"
            currency="RUB"
            locale="ru-RU"
            :class="inputClass"
          />
        </InputGroup>
      </template>
    </FormField>

    <FormField v-bind="getFieldProps(v$.jobInfo, 'responsibilities')">
      <template #default="{ inputClass }">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-list"></i></InputGroupAddon>
          <Textarea
            class="w-full"
            v-model="jobInfo.responsibilities"
            :placeholder="t('form.placeholders.responsibilities')"
            rows="3"
            :class="inputClass"
          />
        </InputGroup>
      </template>
    </FormField>
  </div>
</template>

<script lang="ts" setup>
import { useFormStore } from '@/stores/form'
import { getFieldProps } from '@/utils/formUtils'
import { useI18n } from 'vue-i18n'

type ValidationObject = {
  [key: string]: {
    [field: string]: any
  }
}

const props = defineProps<{
  v$: ValidationObject
}>()

const { t } = useI18n()
const { jobInfo } = useFormStore()
</script>
