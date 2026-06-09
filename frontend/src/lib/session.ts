import { cookies } from 'next/headers';
import { fetchCurrentUser } from '@/services/auth.service';
import { COOKIE_NAME } from '@/lib/auth-cookie';

export async function getServerUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const cookieHeader = token ? `${COOKIE_NAME}=${token}` : undefined;

  return fetchCurrentUser(cookieHeader);
}
