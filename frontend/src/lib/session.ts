import { fetchCurrentUser } from '@/services/auth.service';
import { COOKIE_NAME } from '@/lib/auth-cookie';

export async function getServerUser() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const cookieHeader = token ? `${COOKIE_NAME}=${token}` : undefined;
  return fetchCurrentUser(cookieHeader);
}
