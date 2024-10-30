import { ref, computed } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';

export function useAuth() {
  const user = ref<User | null>(null);
  const loading = ref(true);
  const router = useRouter();

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    loading.value = false;
  });

  const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          loading.value = false;
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      router.push('/login');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Проверка авторизации
  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    loading,
    getCurrentUser,
    register,
    login,
    logout,
    isAuthenticated,
  };
}
