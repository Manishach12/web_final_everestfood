import { proxyToBackend } from '@/lib/proxy';

export async function GET() {
  return proxyToBackend('/api/v1/auth/whoami', { method: 'GET' }, true);
}
