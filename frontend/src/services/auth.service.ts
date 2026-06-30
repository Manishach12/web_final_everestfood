import { AuthResponse, User, getApiUrl } from './api';
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';

async function parseResponse(response: Response): Promise<AuthResponse> {
  let data: AuthResponse;
  try {
    data = (await response.json()) as AuthResponse;
  } catch {
    data = { success: false, message: 'Invalid response from server' };
  }
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

  const response = await fetch(getApiUrl('/api/v1/auth/whoami'), {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  return parseResponse(response);
}

export async function logoutUser(): Promise<AuthResponse> {
  const response = await fetch(getApiUrl('/api/logout'), {
    method: 'POST',
  });
  return parseResponse(response);
}

export async function updateProfile(data: { name?: string; profileImage?: File }): Promise<AuthResponse> {
  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.profileImage) formData.append('profileImage', data.profileImage);

  const response = await fetch('/api/v1/auth/update', {
    method: 'PUT',
    body: formData,
  });
  return parseResponse(response);
}

export async function changePassword(data: { currentPassword: string; newPassword: string }): Promise<AuthResponse> {
  const response = await fetch('/api/v1/auth/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse(response);
}

export type { User, AuthResponse };
