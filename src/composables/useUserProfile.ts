import { ref } from 'vue';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import type { User } from 'firebase/auth';

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useUserProfile() {
  const profile = ref<UserProfile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const createUserProfile = async (user: User) => {
    loading.value = true;
    error.value = null;

    try {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      profile.value = userProfile;
    } catch (err: any) {
      error.value = err.message;
      throw new Error(err.message);
    } finally {
      loading.value = false;
    }
  };

  const getUserProfile = async (uid: string) => {
    loading.value = true;
    error.value = null;

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        profile.value = docSnap.data() as UserProfile;
      } else {
        error.value = 'Profile not found';
      }
    } catch (err: any) {
      error.value = err.message;
      throw new Error(err.message);
    } finally {
      loading.value = false;
    }
  };

  const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    loading.value = true;
    error.value = null;

    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });

      if (profile.value) {
        profile.value = {
          ...profile.value,
          ...data,
          updatedAt: new Date(),
        };
      }
    } catch (err: any) {
      error.value = err.message;
      throw new Error(err.message);
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    loading,
    error,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
  };
}
