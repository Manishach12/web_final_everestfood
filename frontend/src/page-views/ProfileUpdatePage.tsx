'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { updateProfile, changePassword } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { profileUpdateSchema, changePasswordSchema } from '@/schemas/auth.schema';

export function ProfileUpdatePage() {
  const { user, loading, refetch } = useAuthContext();
  const router = useRouter();
  const [profileState, setProfileState] = useState<{ success: boolean; message: string }>({
    success: false,
    message: '',
  });
  const [passwordState, setPasswordState] = useState<{ success: boolean; message: string }>({
    success: false,
    message: '',
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  const handleProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileState({ success: false, message: '' });

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const file = fileInputRef.current?.files?.[0];

    const parsed = profileUpdateSchema.safeParse({ name });
    if (!parsed.success) {
      setProfileState({ success: false, message: parsed.error.flatten().fieldErrors.name?.[0] ?? 'Validation failed' });
      return;
    }

    const result = await updateProfile({ name: parsed.data.name, profileImage: file });
    setProfileState({ success: result.success, message: result.message });
    if (result.success) {
      setPreview(null);
      refetch();
    }
  };

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordState({ success: false, message: '' });

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const parsed = changePasswordSchema.safeParse({ currentPassword, newPassword, confirmPassword });
    if (!parsed.success) {
      setPasswordState({
        success: false,
        message: parsed.error.errors[0].message,
      });
      return;
    }

    const result = await changePassword({
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    });
    setPasswordState({ success: result.success, message: result.message });
    if (result.success) {
      e.currentTarget.reset();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800">
          Profile Settings
        </h1>

        <div className="mb-8 border-b border-slate-100 pb-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-700">Update Profile</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Profile Image</label>
              <div className="mt-2 flex items-center gap-4">
                {preview || user.profileImage ? (
                  <img
                    src={preview || user.profileImage}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
                    <span className="text-2xl font-bold text-slate-500">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block text-sm text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-everest-600 px-4 py-2 font-semibold text-white transition hover:bg-everest-700"
            >
              Save Changes
            </button>

            {!profileState.success && profileState.message && (
              <p className="text-sm text-red-600">{profileState.message}</p>
            )}
            {profileState.success && profileState.message && (
              <p className="text-sm text-green-600">{profileState.message}</p>
            )}
          </form>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-slate-700">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700">
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                minLength={8}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-everest-600 px-4 py-2 font-semibold text-white transition hover:bg-everest-700"
            >
              Change Password
            </button>

            {!passwordState.success && passwordState.message && (
              <p className="text-sm text-red-600">{passwordState.message}</p>
            )}
            {passwordState.success && passwordState.message && (
              <p className="text-sm text-green-600">{passwordState.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
