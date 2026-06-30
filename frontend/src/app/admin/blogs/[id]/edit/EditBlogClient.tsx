'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBlog } from '@/app/actions/blogActions';
import type { Blog } from '@/types/blog';

interface EditBlogClientProps {
  blog: Blog;
}

export default function EditBlogClient({ blog }: EditBlogClientProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(blog.image ?? null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await updateBlog(blog.id, formData);
      router.push('/admin/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800">Edit Blog</h1>
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
            <input
              id="title"
              name="title"
              defaultValue={blog.title}
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
              defaultValue={blog.content}
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none transition focus:border-everest-500 focus:ring-2 focus:ring-everest-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-slate-700">Cover Image</label>
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />
            )}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block text-sm text-slate-600"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded-lg bg-everest-600 px-4 py-2 font-semibold text-white transition hover:bg-everest-700"
            >
              Update
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
