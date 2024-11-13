import type { IUser } from '@/stores/userStore/user.types';
import { jwtDecode } from 'jwt-decode';

interface IDecodedToken {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  exp: number;
}

export class TokenService {
  private static readonly TOKEN_KEY = 'token';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static decodeToken(token: string): IUser | null {
    try {
      const decoded = jwtDecode<IDecodedToken>(token);
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.avatar,
        role: decoded.role,
      };
    } catch {
      return null;
    }
  }

  static getUserFromToken(): IUser | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token);
  }

  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<IDecodedToken>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
