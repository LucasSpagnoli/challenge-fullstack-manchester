import { apiFetch } from "./apiClient";
import { clearAuthToken, setAuthToken } from "./cookies";
import type { AuthUser, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./types/auth.interfaces";

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const response = await apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setAuthToken(response.accessToken);

  return {
    userId: response.newUser.id,
    name: response.newUser.name,
  };
}

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  const response = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setAuthToken(response.accessToken);

  return {
    userId: response.userId,
    name: response.name,
  };
}

export function logoutLocal(): void {
  clearAuthToken();
}