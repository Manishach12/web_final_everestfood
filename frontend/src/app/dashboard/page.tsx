import { redirect } from 'next/navigation';
import { DashboardPage } from '@/pages/DashboardPage';
import { getServerUser } from '@/lib/session';

export default async function Page() {
  const result = await getServerUser();

  if (!result.success || !result.user) {
    redirect('/login');
  }

  return <DashboardPage user={result.user} />;
}
