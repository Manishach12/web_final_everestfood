'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { LogoutButton } from '@/components/LogoutButton';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Profile', href: '/profile', icon: '👤' },
  { label: 'Admin', href: '/admin/blogs', icon: '⚙️' },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-md">
            <div className="flex flex-col items-center text-center">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-everest-100">
                  <span className="text-3xl font-bold text-everest-700">
                    {user?.name?.charAt(0).toUpperCase() ?? '?'}
                  </span>
                </div>
              )}
              <h2 className="mt-4 text-lg font-bold text-slate-800">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-everest-50 text-everest-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-everest-700'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Main Content (Dashboard at bottom) */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
