import { reactive } from 'vue';
import type { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const state = reactive<AuthState>({
  user: null,
  loading: false,
  error: null,
});

export function useAuthStore() {
  const setUser = (user: User | null) => {
    state.user = user;
  };

  const setLoading = (loading: boolean) => {
    state.loading = loading;
  };

  const setError = (error: string | null) => {
    state.error = error;
  };

  const clearError = () => {
    state.error = null;
  };

  const resetState = () => {
    state.user = null;
    state.loading = false;
    state.error = null;
  };

  return {
    state,
    setUser,
    setLoading,
    setError,
    clearError,
    resetState,
  };
}
