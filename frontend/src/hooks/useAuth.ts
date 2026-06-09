'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/services/api';

interface UseAuthResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const response = await fetch('/api/auth/me');
      const result = await response.json();

      if (!active) return;

      if (result.success && result.user) {
        setUser(result.user);
        setError(null);
      } else {
        setUser(null);
        setError(result.message ?? 'Unauthorized');
      }
      setLoading(false);
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  return { user, loading, error };
}
