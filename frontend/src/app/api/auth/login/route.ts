import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

export async function POST(request: NextRequest) {
  const body = await request.text();
  return proxyToBackend('/api/login', {
    method: 'POST',
    body,
  });
}
