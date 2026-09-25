import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, saveTokens } from './tokenService';
import { refreshTokens } from './authService';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onError: (error: Error) => void;
}> = [];

const processQueue = (
  error: Error | null,
  token: string | null = null,
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.onError(error);
    } else if (token) {
      prom.onSuccess(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// INTERCEPTOR REQUEST: Agregar Authorization header
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// INTERCEPTOR RESPONSE: Capturar 401 y auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Cola la request mientras se refresca el token
        return new Promise((resolve, reject) => {
          failedQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            onError: (err: Error) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Intentar refrescar tokens
        const newAccessToken = await refreshTokens();

        // Actualizar header con nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Procesar queue de requests en espera
        processQueue(null, newAccessToken);

        // Reintentar request original
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh falló - logout
        processQueue(refreshError as Error, null);

        // Limpiar tokens y volver al login
        const { useAuthStore } = await import(
          '../stores/authStore'
        );
        const authStore = useAuthStore.getState();
        await authStore.logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
