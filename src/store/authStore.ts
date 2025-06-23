// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { registerUser, loginUser, updateUserProfile } from '../api/authApi';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
  }) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      register: async (data) => {
        try {
          await registerUser(data);
          set({ isAuthenticated: true });
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      },

      login: async (email, password) => {
        try {
          const res = await loginUser(email, password);
          set({ isAuthenticated: true, user: res.user });
          return true;
        } catch (err) {
          console.error('Login failed:', err);
          return false;
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: async (updatedData) => {
        try {
          const currentUser = get().user;
          if (!currentUser?.id) throw new Error('User ID not found');
          // API call
          await updateUserProfile(currentUser.id, updatedData);
          // Update local user data
          const updatedUser = { ...currentUser, ...updatedData };
          set({ user: updatedUser });
        } catch (err) {
          console.error('Update profile failed:', err);
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
