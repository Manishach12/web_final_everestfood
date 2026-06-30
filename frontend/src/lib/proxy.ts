import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_NAME, getBackendUrl, getCookieOptions } from '@/lib/auth-cookie';

function rewriteUploadUrls(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map((item) =>
      item && typeof item === 'object' && 'profileImage' in item && typeof (item as { profileImage?: string }).profileImage === 'string'
        ? {
            ...item,
            profileImage: (item as { profileImage: string }).profileImage.startsWith('/uploads/')
              ? `${getBackendUrl((item as { profileImage: string }).profileImage)}`
              : (item as { profileImage: string }).profileImage,
          }
        : item,
    );
  }
  if (data && typeof data === 'object') {
    if ('user' in data && data.user && typeof data.user === 'object' && 'profileImage' in data.user && typeof (data.user as { profileImage?: string }).profileImage === 'string') {
      return {
        ...data,
        user: {
          ...data.user,
          profileImage: (data.user as { profileImage: string }).profileImage.startsWith('/uploads/')
            ? `${getBackendUrl((data.user as { profileImage: string }).profileImage)}`
            : (data.user as { profileImage: string }).profileImage,
        },
      };
    }
    if ('profileImage' in data && typeof (data as { profileImage?: string }).profileImage === 'string') {
      return {
        ...data,
        profileImage: (data as { profileImage: string }).profileImage.startsWith('/uploads/')
          ? `${getBackendUrl((data as { profileImage: string }).profileImage)}`
          : (data as { profileImage: string }).profileImage,
      };
    }
  }
  return data;
}

export async function proxyToBackend(
  path: string,
  init: RequestInit,
  forwardCookie = false,
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const headers = new Headers(init.headers);
  const isFormData = init.body instanceof FormData;

  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

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
  let parsedBody = body;
  try {
    parsedBody = JSON.parse(body);
    parsedBody = rewriteUploadUrls(parsedBody);
    const rewrittenBody = JSON.stringify(parsedBody);
    const response = new NextResponse(rewrittenBody, {
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
  } catch {
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
}
