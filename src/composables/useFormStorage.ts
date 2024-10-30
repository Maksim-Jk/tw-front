interface FormData {
  id?: number;
  savedAt?: string;
  personInfo: Record<string, any>;
  jobInfo: Record<string, any>;
}

export function useFormStorage() {
  const submittedForms: Ref<FormData[]> = ref([]);

  const getSubmittedForms = (): FormData[] => {
    const storedForms = localStorage.getItem('submittedForms');
    if (storedForms) {
      submittedForms.value = JSON.parse(storedForms);
    }
    return submittedForms.value;
  };

  const saveForm = (formData: FormData): void => {
    const now = new Date();
    const newForm = {
      ...formData,
      id: now.getTime(),
      savedAt: now.toISOString(),
    };
    submittedForms.value.push(newForm);
    localStorage.setItem('submittedForms', JSON.stringify(submittedForms.value));
  };

  const getFormById = (id: number): FormData | null => {
    const forms = getSubmittedForms();
    return forms.find((form) => form.id === id) || null;
  };

  return {
    getSubmittedForms,
    saveForm,
    getFormById,
  };
}
