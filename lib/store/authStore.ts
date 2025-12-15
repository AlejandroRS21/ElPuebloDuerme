import { create } from 'zustand';
import { User, AuthCredentials, RegisterDto } from '@/types/auth';
import { authApi } from '@/lib/api/endpoints';
import { apiClient } from '@/lib/api/client';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterDto) => Promise<boolean>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: AuthCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        apiClient.setToken(accessToken);
        apiClient.setRefreshToken(refreshToken);
        set({
          user,
          token: accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: response.error || 'Login failed', isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
      return false;
    }
  },

  register: async (data: RegisterDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register(data);
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        apiClient.setToken(accessToken);
        apiClient.setRefreshToken(refreshToken);
        set({
          user,
          token: accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: response.error || 'Registration failed', isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
      return false;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.getProfile();
      if (response.success && response.data) {
        set({
          user: response.data as User,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        get().logout();
        set({ isLoading: false });
      }
    } catch (error) {
      get().logout();
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
