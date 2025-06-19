// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { registerUser, loginUser } from '../api/authApi';

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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
      }
    }),
    {
      name: 'auth-storage', // LocalStorage key
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
