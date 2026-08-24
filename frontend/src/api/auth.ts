import { apiFetch } from './apiClient';
import { setAccessToken, clearAccessToken } from './accessToken';
import type { AuthUser, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './types/auth.interfaces';

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const response = await apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  setAccessToken(response.accessToken);

  return {
    userId: response.newUser.id,
    name: response.newUser.name,
    role: "user"
  };
}

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  setAccessToken(response.accessToken);

  return {
    userId: response.userId,
    name: response.name,
    role: response.role as 'admin' | 'user',
  };
}

export function logoutLocal(): void {
  clearAccessToken();
}