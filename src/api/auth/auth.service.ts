import { apiService } from '../api.service';

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    const { data } = await apiService.post<string>('/v1/auth/login', {
      email,
      password,
    });
    return data;
  }

  static async register(email: string, password: string): Promise<string> {
    const { data } = await apiService.post<string>('/v1/auth/register', {
      email,
      password,
    });
    return data;
  }

  static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiService.post('/v1/auth/change-password', {
      oldPassword,
      newPassword,
    });
  }
}
