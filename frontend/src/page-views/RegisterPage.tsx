'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerAction, type ActionState } from '@/app/actions/auth';
import { AuthForm } from '@/components/AuthForm';
import { FormField } from '@/components/FormField';

const initialState: ActionState = { success: false, message: '' };

export function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <div className="mx-auto flex w-full max-w-2xl px-4 py-12 items-center justify-center">
      {/* Main Container */}
      <div className="relative w-full overflow-hidden rounded-lg bg-white p-8 shadow-xl border border-slate-100">
        
        {/* Close Button UI Component */}
        <button className="absolute right-6 top-6 text-xl text-slate-400 hover:text-slate-600">
          &times;
        </button>

        {/* Heading */}
        <h2 className="mb-8 text-2xl font-light text-slate-600 tracking-wide">
          Signup for Everest Food
        </h2>

        <AuthForm 
          action={formAction} 
          pending={pending} 
          state={state} 
          submitLabel="Sign Up"
        >
          {/* Form Field Grid System */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            
            <FormField
              id="firstName"
              name="firstName"
              label="FIRST NAME"
              type="text"
              error={state.errors?.firstName?.[0]}
            />

            <FormField
              id="lastName"
              name="lastName"
              label="LAST NAME"
              type="text"
              error={state.errors?.lastName?.[0]}
            />

            <FormField
              id="email"
              name="email"
              label="EMAIL ADDRESS"
              type="email"
              autoComplete="email"
              error={state.errors?.email?.[0]}
            />

            <FormField
              id="mobileNumber"
              name="mobileNumber"
              label="MOBILE NUMBER"
              type="tel"
              error={state.errors?.mobileNumber?.[0]}
            />

            <FormField
              id="password"
              name="password"
              label="CHOOSE A PASSWORD"
              type="password"
              error={state.errors?.password?.[0]}
            />

            <FormField
              id="confirmPassword"
              name="confirmPassword"
              label="CONFIRM PASSWORD"
              type="password"
              error={state.errors?.confirmPassword?.[0]}
            />

          </div>

          {/* Simulated reCAPTCHA Field Box */}
          <div className="my-4 max-w-xs flex items-center justify-between border border-slate-200 bg-slate-50 p-3 rounded shadow-sm">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="recaptcha" 
                className="h-6 w-6 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                required 
              />
              <label htmlFor="recaptcha" className="text-sm font-medium text-slate-700 select-none">
                I'm not a robot
              </label>
            </div>
            <div className="flex flex-col items-center justify-center opacity-60 text-[10px] text-slate-500">
              <div className="w-6 h-6 bg-blue-500 rounded-sm mb-0.5 flex items-center justify-center text-white text-[9px] font-bold">↻</div>
              reCAPTCHA
            </div>
          </div>

          {/* Legals / Terms & Conditions block */}
          <p className="text-xs text-slate-500 font-light">
            By Signing Up, I agree to Everest Food's{' '}
            <Link href="/terms" className="text-slate-600 hover:underline">Terms of Use</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-slate-600 hover:underline">Privacy Policy</Link>.
          </p>
        </AuthForm>

        {/* Social Authentication Split Section */}
        <div className="mt-8 text-center">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
            OR SIGNUP USING
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              className="flex items-center justify-center rounded bg-[#3B5998] py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Facebook
            </button>
            <button 
              type="button" 
              className="flex items-center justify-center rounded bg-[#EA4335] py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Google
            </button>
          </div>
        </div>

        {/* Direct link fallback to Sign in page */}
        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#F7D100] dark:text-amber-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}