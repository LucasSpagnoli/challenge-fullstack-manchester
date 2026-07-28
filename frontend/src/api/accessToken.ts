export function setAccessToken(token: string): void {
  sessionStorage.setItem('accessToken', token)
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem('accessToken')
}

export function clearAccessToken(): void {
  sessionStorage.removeItem('accessToken')
}