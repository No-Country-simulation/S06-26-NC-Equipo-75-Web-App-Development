// ---------------------------------------------------------------
//  Función auxiliar para decodificar JWT (sin librerías externas)
// ---------------------------------------------------------------
function parseJwt(token: string): {
  sub: string;
  email: string;
  role: string;
  name?: string;
} {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// ---------------------------------------------------------------
//  URL de la API
// ---------------------------------------------------------------
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ---------------------------------------------------------------
//  Tipo de respuesta del login (tal como lo espera el contexto)
// ---------------------------------------------------------------
export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

// ---------------------------------------------------------------
//  Mapeo de roles desde el JWT a los roles de la app
// ---------------------------------------------------------------
const ROLE_MAP: Record<string, string> = {
  ADMIN: 'empresa_admin',
  RECRUITER: 'reclutador',
  // Si en el futuro el token usa minúsculas u otros nombres, agregalos acá
};

// ---------------------------------------------------------------
//  API de autenticación
// ---------------------------------------------------------------
export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error de autenticación');
    }

    // Decodificar el token para extraer los datos del usuario
    const payload = parseJwt(data.accessToken);

    // Normalizar el rol (porque el token devuelve "ADMIN" en mayúsculas)
    const normalizedRole = ROLE_MAP[payload.role] || payload.role;

    return {
      access_token: data.accessToken,
      user: {
        id: payload.sub,
        email: payload.email,
        role: normalizedRole,
        name: payload.name,
      },
    };
  },
};