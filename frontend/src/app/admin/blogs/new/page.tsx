'use client';

import { useState, useActionState } from 'react';
import { createBlog } from '@/app/actions/blogActions';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await createBlog(formData);
      router.push('/admin/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800">Create Blog</h1>
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
            <input
              id="title"
              name="title"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-700">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-slate-700">Cover Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="mt-1 block text-sm text-slate-600"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded-lg bg-everest-600 px-4 py-2 font-semibold text-white transition hover:bg-everest-700"
            >
              Create
            </button>
            <a href="/admin/blogs" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
