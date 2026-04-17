const SESSION_KEY = 'smartlab_admin_auth';

export function login(password: string): boolean {
  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  if (password === correctPassword) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
