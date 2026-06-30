import { Suspense } from 'react';
import { BlogTable } from '@/components/admin/BlogTable';
import { Pagination } from '@/components/admin/Pagination';
import { fetchBlogs } from '@/app/actions/blogActions';

interface AdminBlogsPageProps {
  searchParams: Promise<{ page?: string; size?: string; search?: string }>;
}

export default async function AdminBlogsPage({ searchParams }: AdminBlogsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1'));
  const size = Math.max(1, Math.min(50, parseInt(params.size ?? '10')));
  const search = params.search ?? '';

  const data = await fetchBlogs({ page, size, search });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Admin Panel - Blogs</h1>
          <a
            href="/admin/blogs/new"
            className="rounded-lg bg-everest-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-everest-700"
          >
            Create Blog
          </a>
        </div>

        {search && (
          <div className="mb-4 text-sm text-slate-600">
            Showing results for: <span className="font-semibold">{search}</span>
            <a href="/admin/blogs" className="ml-2 text-everest-600 hover:underline">Clear</a>
          </div>
        )}

        <Suspense fallback={<div className="py-12 text-center text-slate-500">Loading blogs...</div>}>
          <BlogTable blogs={data.items} />
        </Suspense>

        <div className="mt-6">
          <Pagination page={data.page} totalPages={data.totalPages} size={data.size} search={search} />
        </div>
      </div>
    </div>
  );
}
