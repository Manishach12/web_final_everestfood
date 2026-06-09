import { proxyToBackend } from '@/lib/proxy';

export async function POST() {
  return proxyToBackend('/api/logout', { method: 'POST' }, true);
}
