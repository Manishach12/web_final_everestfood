'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Blog } from '@/types/blog';
import { deleteBlog } from '@/app/actions/blogActions';

interface BlogTableProps {
  blogs: Blog[];
}

export function BlogTable({ blogs }: BlogTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    setDeletingId(id);
    try {
      await deleteBlog(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  if (blogs.length === 0) {
    return <p className="py-12 text-center text-slate-500">No blogs found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Content</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Created</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {blogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900">{blog.title}</td>
              <td className="px-4 py-4 text-sm text-slate-600">
                <div className="line-clamp-2 max-w-xs">{blog.content}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="font-medium text-everest-600 hover:text-everest-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    disabled={deletingId === blog.id}
                    className="font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
