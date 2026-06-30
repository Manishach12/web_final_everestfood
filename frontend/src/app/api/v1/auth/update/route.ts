import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

export async function PUT(request: NextRequest) {
  const formData = await request.formData();
  return proxyToBackend('/api/v1/auth/update', {
    method: 'PUT',
    body: formData,
  }, true);
}
