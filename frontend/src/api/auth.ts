import { apiFetch } from './apiClient';
import type { AuthUser, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './types/auth.interfaces';

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const response = await apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return { userId: response.newUser.id, name: response.newUser.name };
}

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return { userId: response.userId, name: response.name };
}

export async function logoutUser(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
}

export async function fetchAuthStatus(): Promise<AuthUser | null> {
  try {
    return await apiFetch<AuthUser>('/auth/status');
  } catch {
    return null; // não autenticado ou cookie expirado
  }
}