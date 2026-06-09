'use client';

import { useFormStatus } from 'react-dom';
import type { ActionState } from '@/app/actions/auth';

interface AuthFormProps {
  action: (payload: FormData) => void;
  pending: boolean;
  state: ActionState;
  submitLabel: string;
  children: React.ReactNode;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-everest-600 px-4 py-2.5 font-semibold text-white transition hover:bg-everest-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Please wait…' : label}
    </button>
  );
}

export function AuthForm({ action, state, submitLabel, children }: AuthFormProps) {
  return (
    <form action={action} className="mt-8 space-y-5">
      {children}

      {!state.success && state.message && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  );
}
