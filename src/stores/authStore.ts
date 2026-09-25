import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  login as loginService,
  logout as logoutService,
  refreshTokens as refreshTokensService,
  AuthUser,
} from '../services/authService';
import { getAccessToken } from '../services/tokenService';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    username: string,
    password: string,
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshTokens: () => Promise<string>;

  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (
        username,
        password,
      ): Promise<void> => {
        set({ isLoading: true });

        try {
          const user = await loginService(
            username,
            password,
          );

          console.log('LOGIN OK:', user);

          set({
            user,
            isAuthenticated: true,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async (): Promise<void> => {
        await logoutService();

        set({
          user: null,
          isAuthenticated: false,
        });
      },

      refreshTokens: async (): Promise<string> => {
        return refreshTokensService();
      },

      restoreSession: async (): Promise<void> => {
        set({ isLoading: true });

        try {
          const token = await getAccessToken();

          if (token) {
            // Token válido - mantener sesión
            set({ isAuthenticated: true });
          } else {
            // No hay token - logout
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error('Error restoring session:', error);
          set({
            user: null,
            isAuthenticated: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'autorent-auth',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
