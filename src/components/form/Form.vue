<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <Tabs value="0">
        <TabList>
          <Tab
            v-for="tab in tabs"
            :key="tab.title"
            :value="tab.value"
            class="flex items-center"
          >
            {{ $t(tab.title) }}
            <span
              v-if="hasErrors(tab.value)"
              class="ml-2 mt-1 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"
            ></span>
          </Tab>
        </TabList>
        <TabPanels class="px-0">
          <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
            <component v-if="tab.component" :is="tab.component" :v$="v$" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div class="mt-4">
        <Button type="submit" class="btn btn-primary">{{
          $t('form.submit')
        }}</Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import PersonInfo from './components/PersonInfo.vue'
import PersonJobInfo from './components/PersonJobInfo.vue'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  minLength,
  maxLength,
  minValue,
  numeric,
  email,
  phoneValidator,
  dateInPast,
} from '@/utils/i18n-validators'
import { useFormStore } from '@/stores/form'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const formStore = useFormStore()

const tabs = ref([
  {
    title: 'form.tabs.personalInfo.title',
    value: '0',
    component: markRaw(PersonInfo),
  },
  {
    title: 'form.tabs.jobInfo.title',
    value: '1',
    component: markRaw(PersonJobInfo),
  },
])

const rules = computed(() => ({
  personInfo: {
    firstName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
    lastName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50),
    },
    phone: {
      required,
      phoneValidator,
    },
    email: {
      required,
      email,
    },
  },
  jobInfo: {
    jobTitle: {
      required,
      maxLength: maxLength(100),
    },
    company: {
      required,
      maxLength: maxLength(100),
    },
    startDate: {
      required,
      dateInPast,
    },
    location: { required },
    salary: {
      required,
      numeric,
      minValue: minValue(1),
    },
    responsibilities: {
      required,
      minLength: minLength(20),
    },
  },
}))

const v$ = useVuelidate(rules, formStore.$state)
const { t } = useI18n()

const toast = useToast()

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    console.log('Form is valid', formStore.formData)
    // Используем PrimeVue toast для успешного сообщения
    toast.add({
      severity: 'success',
      summary: t('form.submitSuccessTitle'),
      detail: t('form.submitSuccessMessage'),
      life: 3000,
    })
  } else {
    // Используем PrimeVue toast для сообщения об ошибке
    toast.add({
      severity: 'error',
      summary: t('form.submitErrorTitle'),
      detail: t('form.submitErrorMessage'),
      life: 3000,
    })
  }
}

const hasErrors = tabValue => {
  if (tabValue === '0') {
    return v$.value.personInfo.$error
  } else if (tabValue === '1') {
    return v$.value.jobInfo.$error
  }
  return false
}
</script>

<style scoped>
.tab-with-indicator {
  @apply flex items-center;
}

.error-indicator {
  @apply ml-2 mt-1 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0;
}
</style>
