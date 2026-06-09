import { AuthResponse, User, getApiUrl } from './api';
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';

async function parseResponse(response: Response): Promise<AuthResponse> {
  const data = (await response.json()) as AuthResponse;
  if (!response.ok) {
    return {
      success: false,
      message: data.message ?? 'Request failed',
      errors: data.errors,
    };
  }
  return data;
}

export async function registerUser(
  payload: Omit<RegisterFormData, 'confirmPassword'>,
): Promise<{ result: AuthResponse; setCookie: string | null }> {
  const response = await fetch(getApiUrl('/api/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return {
    result: await parseResponse(response),
    setCookie: response.headers.get('set-cookie'),
  };
}

export async function loginUser(
  payload: LoginFormData,
): Promise<{ result: AuthResponse; setCookie: string | null }> {
  const response = await fetch(getApiUrl('/api/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return {
    result: await parseResponse(response),
    setCookie: response.headers.get('set-cookie'),
  };
}

export async function fetchCurrentUser(cookieHeader?: string): Promise<AuthResponse> {
  const headers: HeadersInit = {};
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  const response = await fetch(getApiUrl('/api/me'), {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  return parseResponse(response);
}

export async function logoutUser(cookieHeader?: string): Promise<AuthResponse> {
  const headers: HeadersInit = {};
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  const response = await fetch(getApiUrl('/api/logout'), {
    method: 'POST',
    headers,
  });
  return parseResponse(response);
}

export type { User, AuthResponse };
