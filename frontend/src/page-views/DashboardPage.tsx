import type { User } from '@/services/api';
import { LogoutButton } from '@/components/LogoutButton';

interface DashboardPageProps {
  user: User;
}

export function DashboardPage({ user }: DashboardPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Premium Dashboard Shell Container */}
      <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md">
        
        {/* Welcome Block Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#F7D100] dark:text-amber-500 uppercase">
              Protected Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-800">
              Hello, {user.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-light">
              {user.email}
            </p>
          </div>
          
          {/* Custom Form Actions Buttons components layout */}
          <div className="shrink-0">
            <LogoutButton />
          </div>
        </div>

        {/* Coming Soon Food Preview Interactive Cards Grid Section */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {['Momos', 'Dal Bhat', 'Thukpa'].map((item) => (
            <div
              key={item}
              className="group rounded-lg border-2 border-dashed border-amber-200 bg-amber-50/40 p-6 text-center transition-all duration-300 hover:border-amber-400 hover:bg-amber-50/80"
            >
              <p className="font-bold text-slate-700 tracking-tight group-hover:text-amber-600 transition-colors">
                {item}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-600/80">
                Coming Soon
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}