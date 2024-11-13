import { TokenService } from '@/services/token.service';
import { apiService } from '../api.service';
import type { ISettingsDto } from './settings.types';
import { useSettingsStore } from '@/stores/settings';
import { ROUTES } from '@/router/routes';

export class SettingsService {
  static async getSettings(): Promise<void> {
    try {
      const response = await apiService.get<ISettingsDto>('/v1/settings');
      const settingsStore = useSettingsStore();
      settingsStore.setSettings(response.data);
    } catch (error) {
      TokenService.removeToken();
      const router = useRouter();
      router.push({ name: ROUTES.LOGIN });
      throw error;
    }
  }
}
