'use client';

import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { LogoutButton } from '@/components/LogoutButton';

export function Navbar() {
  const { user, loading } = useAuthContext();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-everest-700">
          Everest Food
        </Link>

        {!loading && user ? (
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/profile" className="text-slate-600 hover:text-everest-700">
              Profile
            </Link>
            <Link href="/admin/blogs" className="text-slate-600 hover:text-everest-700">
              Admin
            </Link>
            <LogoutButton />
          </nav>
        ) : (
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/login" className="text-slate-600 hover:text-everest-700">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-everest-600 px-3 py-1.5 text-white hover:bg-everest-700"
            >
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
