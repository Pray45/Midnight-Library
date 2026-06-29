import { create as createAxios, isAxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';

type User = {
  id: number;
  name: string | null;
  email: string;
  profilePic?: string | null;
};

type AuthResponse = {
  success?: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
};

interface AuthState {
  userData: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  loggedIn: boolean;
  hydrated: boolean;
  error: string | null;

  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAccessToken: () => Promise<void>;
  fetchUser: (userId?: number | string) => Promise<void>;
}

const STORAGE_KEYS = {
  accessToken: 'auth.accessToken',
  refreshToken: 'auth.refreshToken',
  userData: 'auth.userData',
} as const;

const API_BASE_URL = 'https://moonlit-xo1i.onrender.com';

const storage = {
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return globalThis.localStorage?.getItem(key) ?? null;
    }
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

const parseUser = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
};

const persistSession = async (payload: AuthResponse) => {
  await Promise.all([
    storage.setItem(STORAGE_KEYS.accessToken, payload.accessToken),
    storage.setItem(STORAGE_KEYS.refreshToken, payload.refreshToken),
    storage.setItem(STORAGE_KEYS.userData, JSON.stringify(payload.user)),
  ]);
};

const clearSession = async () => {
  await Promise.all([
    storage.removeItem(STORAGE_KEYS.accessToken),
    storage.removeItem(STORAGE_KEYS.refreshToken),
    storage.removeItem(STORAGE_KEYS.userData),
  ]);
};

const authErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      'Authentication failed'
    );
  }
  return error instanceof Error ? error.message : 'Authentication failed';
};

const apiClient = createAxios({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const useAuthStore = create<AuthState>((set, get) => ({
  userData: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  loggedIn: false,
  loading: false,
  hydrated: false,

  register: async (data: { name: string; email: string; password: string }) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post<AuthResponse>('/user/register', data);
      const payload = response.data;
      await persistSession(payload);
      set({
        userData: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        loggedIn: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: authErrorMessage(error),
        loading: false,
        loggedIn: false,
      });
      throw error;
    }
  },

  login: async (data: { email: string; password: string }) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post<AuthResponse>('/user/login', data);
      const payload = response.data;
      await persistSession(payload);
      set({
        userData: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        loggedIn: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: authErrorMessage(error),
        loading: false,
        loggedIn: false,
      });
      throw error;
    }
  },

  logout: async () => {
    await clearSession();
    set({
      userData: null,
      accessToken: null,
      refreshToken: null,
      error: null,
      loggedIn: false,
      loading: false,
    });
  },

  checkAccessToken: async () => {
    set({ loading: true });
    const [accessToken, refreshToken, storedUser] = await Promise.all([
      storage.getItem(STORAGE_KEYS.accessToken),
      storage.getItem(STORAGE_KEYS.refreshToken),
      storage.getItem(STORAGE_KEYS.userData),
    ]);

    const userData = parseUser(storedUser);

    set({
      accessToken,
      refreshToken,
      userData,
      loggedIn: Boolean(accessToken),
      loading: false,
      hydrated: true,
    });
  },

  fetchUser: async (userId) => {
    const { accessToken } = get();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const resolvedUserId = userId ?? get().userData?.id;
    if (!resolvedUserId) {
      throw new Error('User id is required');
    }

    try {
      const response = await apiClient.get<User>(`/user/${resolvedUserId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      set({
        userData: response.data,
        error: null,
      });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        await clearSession();
        set({
          userData: null,
          accessToken: null,
          refreshToken: null,
          loggedIn: false,
          error: 'Session expired. Please sign in again.',
        });
        return;
      }

      throw error;
    }
  },
}));
