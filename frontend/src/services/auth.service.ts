import { apiClient } from './apiClient';

// ---------- Tipos ----------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    name?: string;
    companyId?: string;
  };
}

// ---------- Helpers ----------
function parseJwt(token: string): {
  sub: string;
  email: string;
  role: string;
  name?: string;
  companyId?: string;
} {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

const ROLE_MAP: Record<string, string> = {
  ADMIN: 'empresa_admin',
  RECRUITER: 'reclutador',
};

interface MeResponse {
  id: string;
  email: string;
  rol: string;
  nombre?: string;
  apellido?: string;
  empresas: { empresaId: string }[];
}
// ---------- Servicio ----------
export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const data = await apiClient<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    const payload = parseJwt(data.accessToken);
    const role = ROLE_MAP[payload.role] || payload.role;

    return {
      accessToken: data.accessToken,
      user: {
        id: payload.sub,
        email: payload.email,
        role,
        name: payload.name,
      },
    };
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient<{ accessToken: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const payload = parseJwt(response.accessToken);
    const role = ROLE_MAP[payload.role] || payload.role;

    return {
      accessToken: response.accessToken,
      user: {
        id: payload.sub,
        email: payload.email,
        role,
        name: payload.name,
      },
    };
  },

  async getMe(): Promise<AuthResponse['user']> {
    const data = await apiClient<MeResponse>('/auth/me');
    return {
      id: data.id,
      email: data.email,
      role: ROLE_MAP[data.rol] || data.rol,
      name: `${data.nombre} ${data.apellido}`,
      companyId: data.empresas?.[0]?.empresaId,
    };
  },
};
