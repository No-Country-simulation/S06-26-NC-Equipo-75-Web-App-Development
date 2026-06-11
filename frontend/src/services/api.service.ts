const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error de autenticación');
    }

    return data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },
};