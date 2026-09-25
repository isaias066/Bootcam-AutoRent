import { api } from './api';
import {
  clearTokens,
  getRefreshToken,
  saveTokens,
} from './tokenService';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(
  username: string,
  password: string,
): Promise<AuthUser> {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    {
      username,
      password,
      expiresInMins: 30,
    },
  );

  const data = response.data;

  await saveTokens(
    data.accessToken,
    data.refreshToken,
  );

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.image,
  };
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  try {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      {
        username,
        password,
        expiresInMins: 30,
      },
    );

    const data = response.data;

    await saveTokens(
      data.accessToken,
      data.refreshToken,
    );

    return {
      id: data.id,
      username: data.username,
      email: data.email || email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'No se pudo completar el registro',
    );
  }
}

export async function refreshTokens(): Promise<string> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error('No existe refresh token');
  }

  const response = await api.post<RefreshResponse>(
    '/auth/refresh',
    {
      refreshToken,
      expiresInMins: 30,
    },
  );

  await saveTokens(
    response.data.accessToken,
    response.data.refreshToken,
  );

  return response.data.accessToken;
}

export async function logout(): Promise<void> {
  await clearTokens();
}
