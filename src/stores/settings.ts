import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type ISettingsDto } from '@/api/settings/settings.types';

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light');
  const settings = ref<ISettingsDto | null>(null);

  const setSettings = (newSettings: ISettingsDto): void => {
    settings.value = newSettings;
  };

  const getSettingsByKey = (key: keyof ISettingsDto): unknown => {
    return settings.value?.[key];
  };

  return {
    theme,
    settings,
    setSettings,
    getSettingsByKey,
  };
});
