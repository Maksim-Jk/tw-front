import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface IPersonInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface IJobInfo {
  jobTitle: string;
  company: string;
  startDate: Date | null;
  location: string;
  salary: number | null;
  responsibilities: string;
}

export interface IFormData {
  id?: number;
  savedAt?: string;
  personInfo: IPersonInfo;
  jobInfo: IJobInfo;
}

export const useFormStore = defineStore('form', () => {
  const personInfo = ref<IPersonInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const jobInfo = ref<IJobInfo>({
    jobTitle: '',
    company: '',
    startDate: null,
    location: '',
    salary: null,
    responsibilities: '',
  });

  const setFormData = (formData: IFormData) => {
    personInfo.value = { ...formData.personInfo };
    jobInfo.value = { ...formData.jobInfo };
  };

  return { personInfo, jobInfo, setFormData };
});
