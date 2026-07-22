import { apiFetch } from "./client";
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

// // TODO: Rotas para as funções abaixo e remoção do logout local
// export async function logoutUser(): Promise<void> {
//   return apiFetch<void>("/auth/logout", {
//     method: "POST",
//   });
// }

// export async function getCurrentUser(): Promise<AuthUser> {
//   return apiFetch<AuthUser>("/auth/me", {
//     method: "GET",
//   });
// }