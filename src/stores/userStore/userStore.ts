import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUser } from '@/stores/userStore/user.types';

interface UserState {
  id: number | null;
  name: string;
  email: string;
  avatar: string;
  role: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  avatar: '',
  role: '',
  isAuthenticated: false,
};

export const useUserStore = defineStore('user', () => {
  const state = ref<UserState>({ ...initialState });

  function setUser(userData: IUser): void {
    Object.assign(state.value, {
      ...userData,
      isAuthenticated: true,
    });
  }

  function clearUser(): void {
    Object.assign(state.value, initialState);
  }

  return {
    state,
    setUser,
    clearUser,
  };
});
