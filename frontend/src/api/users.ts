import { apiFetch } from './apiClient';
import type { UserRecord, CreateUserPayload } from './types/user.interfaces';

export async function getAllUsers(): Promise<UserRecord[]> {
  return apiFetch<UserRecord[]>('/users');
}

export async function createUser(payload: CreateUserPayload): Promise<UserRecord> {
  return apiFetch<UserRecord>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id: number): Promise<void> {
  await apiFetch<void>(`/users/${id}`, { method: 'DELETE' });
}
