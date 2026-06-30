'use client';

import Link from 'next/link';

interface PaginationProps {
  page: number;
  totalPages: number;
  size: number;
  search?: string;
}

export function Pagination({ page, totalPages, size, search }: PaginationProps) {
  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    params.set('page', String(targetPage));
    params.set('size', String(size));
    if (search) params.set('search', search);
    return `/admin/blogs?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={buildHref(Math.max(1, page - 1))}
          className={`rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium transition ${
            page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-slate-50'
          }`}
        >
          Previous
        </Link>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={buildHref(p)}
            className={`rounded-lg px-3 py-1 text-sm font-medium transition ${
              p === page
                ? 'bg-everest-600 text-white'
                : 'border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {p}
          </Link>
        ))}
        <Link
          href={buildHref(Math.min(totalPages, page + 1))}
          className={`rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium transition ${
            page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-slate-50'
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
