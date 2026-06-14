const TOKEN_COOKIE_NAME = "auth_token";
const TOKEN_COOKIE_DAYS = 7; // duração do cookie em dias

export function setAuthToken(token: string): void {
  const maxAge = TOKEN_COOKIE_DAYS * 24 * 60 * 60; // em segundos
  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(
    token
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getAuthToken(): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_COOKIE_NAME}=`));

  if (!match) return null;

  return decodeURIComponent(match.split("=")[1]);
}

export function clearAuthToken(): void {
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0`;
}