import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_NAME, getBackendUrl, getCookieOptions } from '@/lib/auth-cookie';

export async function proxyToBackend(
  path: string,
  init: RequestInit,
  forwardCookie = false,
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');

  if (forwardCookie) {
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (token) {
      headers.set('Cookie', `${COOKIE_NAME}=${token}`);
    }
  }

  const backendResponse = await fetch(getBackendUrl(path), {
    ...init,
    headers,
  });

  const body = await backendResponse.text();
  const response = new NextResponse(body, {
    status: backendResponse.status,
    headers: { 'Content-Type': 'application/json' },
  });

  const setCookie = backendResponse.headers.get('set-cookie');
  if (setCookie) {
    const tokenMatch = setCookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    if (tokenMatch) {
      response.cookies.set(COOKIE_NAME, tokenMatch[1], getCookieOptions());
    }
  }

  if (path === '/api/logout' && backendResponse.ok) {
    response.cookies.delete(COOKIE_NAME);
  }

  return response;
}
