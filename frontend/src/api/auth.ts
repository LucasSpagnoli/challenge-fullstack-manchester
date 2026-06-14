import { apiFetch } from "./client";
import { clearAuthToken, setAuthToken } from "./cookies";
import type { AuthResponse, LoginPayload, RegisterPayload } from "./types/auth.interfaces";

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(
  payload: LoginPayload
): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  setAuthToken(response.token);
  return response;
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

export function logoutLocal(): void {
  clearAuthToken();
}