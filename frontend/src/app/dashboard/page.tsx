import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/DashboardShell';
import { getServerUser } from '@/lib/session';

export default async function Page() {
  const result = await getServerUser();

  if (!result.success || !result.user) {
    redirect('/login');
  }

  return <DashboardShell user={result.user} />;
}
