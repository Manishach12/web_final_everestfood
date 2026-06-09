const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
const COOKIE_NAME = process.env.COOKIE_NAME ?? 'everest_token';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export function getBackendUrl(path: string): string {
  return `${BACKEND_URL}${path}`;
}

export function applyAuthCookieFromHeader(setCookieHeader: string | null): void {
  if (!setCookieHeader) return;

  const tokenMatch = setCookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!tokenMatch) return;

  // Dynamic import avoided — callers use cookies() from next/headers
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? ('strict' as const) : ('lax' as const),
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  };
}

export { COOKIE_NAME, BACKEND_URL };
