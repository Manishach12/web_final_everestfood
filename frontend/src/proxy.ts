import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAME } from '@/lib/auth-cookie';

export function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const protectedPrefixes = ['/dashboard', '/profile', '/admin'];
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
};
