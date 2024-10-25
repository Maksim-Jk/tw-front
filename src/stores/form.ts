import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {
  const personInfo = ref({
    firstName: '',
    lastName: '',
    phone: '',
  })

  const jobInfo = ref({
    jobTitle: '',
    company: '',
    startDate: null,
    location: '',
    salary: null,
    responsibilities: '',
  })

  return { personInfo, jobInfo }
})
