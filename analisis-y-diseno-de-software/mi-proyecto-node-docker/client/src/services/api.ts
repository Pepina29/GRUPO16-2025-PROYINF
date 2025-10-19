import { API_ENDPOINTS } from '@/config/api';

export interface LoginData {
  rut: number;
  password: string;
}

export interface RegisterData {
  rut: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface User {
  rut: number;
  nombre_cliente: string;
  apellido_cliente: string;
  email_cliente: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Login
export const login = async (data: LoginData): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Error al iniciar sesión',
      };
    }

    return {
      success: true,
      data: result.user,
    };
  } catch (error) {
    console.error('Error en login:', error);
    return {
      success: false,
      error: 'Error de conexión con el servidor',
    };
  }
};

// Registro
export const register = async (data: RegisterData): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(API_ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Error al registrarse',
      };
    }

    return {
      success: true,
      data: result.user,
    };
  } catch (error) {
    console.error('Error en registro:', error);
    return {
      success: false,
      error: 'Error de conexión con el servidor',
    };
  }
};