import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@demo.com',
    password: 'password',
    role: 'user',
    address: '123 Main St, City, State',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin',
    role: 'admin',
    address: '456 Admin Ave, Admin City',
    phone: '+0987654321'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock authentication
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            token: 'mock-jwt-token',
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      register: async (userData) => {
        // Mock registration
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
        };
        mockUsers.push({ ...newUser, password: userData.password });
        set({
          user: newUser,
          token: 'mock-jwt-token',
          isAuthenticated: true
        });
        return true;
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      updateProfile: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);