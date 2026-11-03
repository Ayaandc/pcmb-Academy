const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const TOKEN_KEY = 'pcmb_academy_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
  return data as T;
}

export async function login(email: string, password: string) {
  const data = await apiRequest<{ token: string; user: import('../types').User }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data.user;
}

export async function register(name: string, email: string, password: string) {
  return apiRequest('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
}

export async function getCurrentUser() {
  const data = await apiRequest<{ user: import('../types').User }>('/auth/me');
  return data.user;
}
