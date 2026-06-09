'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction, type ActionState } from '@/app/actions/auth';
import { AuthForm } from '@/components/AuthForm';
import { FormField } from '@/components/FormField';

const initialState: ActionState = { success: false, message: '' };

export function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto flex w-full max-w-4xl px-4 py-12 items-center justify-center">
      {/* Container Box Split View */}
      <div className="flex w-full overflow-hidden rounded-lg bg-white shadow-xl border border-slate-100 min-h-[550px]">
        
        {/* Left Side: Brand Visual Banner */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#F7D100] p-8 md:flex">
          <div className="text-center z-10 flex flex-col items-center">
            {/* Simple representation of the brand logo mark */}
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white text-3xl font-black italic">
              EF
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              Everest Food
            </h1>
          </div>
          
          {/* Decorative food item background simulation */}
          <div className="absolute bottom-0 right-0 left-0 top-1/2 opacity-95 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center overflow-hidden">
            <div className="w-11/12 h-44 bg-amber-800/40 rounded-t-full border-t-4 border-amber-900/40 flex items-center justify-center text-white/50 text-xs tracking-widest font-mono">
              [ PIZZA VISUAL BACKGROUND ]
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Interface */}
        <div className="w-full p-8 md:w-1/2 flex flex-col justify-center relative">
          {/* Close button indicator matching standard design */}
          <button className="absolute right-6 top-6 text-xl text-slate-400 hover:text-slate-600">
            &times;
          </button>

          <h2 className="mb-6 text-2xl font-semibold text-slate-700">
            Login to Everest Food
          </h2>

          <AuthForm 
            action={formAction} 
            pending={pending} 
            state={state} 
            submitLabel="Login"
          >
            <FormField
              id="email"
              name="email"
              label="EMAIL ADDRESS"
              type="email"
              autoComplete="email"
              error={state.errors?.email?.[0]}
            />
            
            <FormField
              id="password"
              name="password"
              label="ENTER PASSWORD"
              type="password"
              autoComplete="current-password"
              error={state.errors?.password?.[0]}
            />

            {/* Remember me utility checkbox */}
            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-slate-600">
                Remember Me
              </label>
            </div>
          </AuthForm>

          {/* Social Sign In Blocks */}
          <div className="mt-6 text-center">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-3">
              OR LOGIN USING
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                className="flex items-center justify-center rounded bg-[#3B5998] py-2 text-sm font-medium text-white hover:bg-[#344e85]"
              >
                Facebook
              </button>
              <button 
                type="button" 
                className="flex items-center justify-center rounded bg-[#EA4335] py-2 text-sm font-medium text-white hover:bg-[#d63427]"
              >
                Google
              </button>
            </div>
          </div>

          {/* Bottom redirection choices */}
          <div className="mt-8 text-center text-sm space-y-2">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-emerald-600 hover:underline">
                Signup
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="text-slate-500 hover:text-slate-700 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}