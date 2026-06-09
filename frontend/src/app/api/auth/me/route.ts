import { proxyToBackend } from '@/lib/proxy';

export async function GET() {
  return proxyToBackend('/api/me', { method: 'GET' }, true);
}
