import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

export async function PUT(request: NextRequest) {
  const body = await request.text();
  return proxyToBackend('/api/v1/auth/password', {
    method: 'PUT',
    body,
  }, true);
}
