'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { registerSchema, loginSchema } from '@/schemas/auth.schema';
import { loginUser, registerUser } from '@/services/auth.service';
import { COOKIE_NAME, getCookieOptions } from '@/lib/auth-cookie';

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

async function applySetCookieHeader(setCookieHeader: string | null): Promise<void> {
  if (!setCookieHeader) return;

  const tokenMatch = setCookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!tokenMatch) return;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, tokenMatch[1], getCookieOptions());
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { confirmPassword, ...payload } = parsed.data;
  void confirmPassword;
  const { result, setCookie } = await registerUser(payload);

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      errors: result.errors,
    };
  }

  await applySetCookieHeader(setCookie);
  redirect('/dashboard');
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { result, setCookie } = await loginUser(parsed.data);

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      errors: result.errors,
    };
  }

  await applySetCookieHeader(setCookie);
  redirect('/dashboard');
}
