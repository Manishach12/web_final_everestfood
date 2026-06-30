'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { COOKIE_NAME } from '@/lib/auth-cookie';
import type { Blog, BlogPagination } from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function getCookieHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token ? `${COOKIE_NAME}=${token}` : undefined;
}

async function apiFetch(path: string, init: RequestInit = {}) {
  const cookieHeader = await getCookieHeader();
  const headers: HeadersInit = { ...init.headers };
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }
  if (!(init.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message ?? 'Request failed');
  }

  return response;
}

export async function fetchBlogs(params: {
  page?: number;
  size?: number;
  search?: string;
}): Promise<BlogPagination> {
  const url = new URL(`${API_URL}/api/v1/blogs`, 'http://localhost');
  url.searchParams.set('page', String(params.page ?? 1));
  url.searchParams.set('size', String(params.size ?? 10));
  if (params.search) {
    url.searchParams.set('search', params.search);
  }

  const cookieHeader = await getCookieHeader();
  const headers: HeadersInit = {};
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  const response = await fetch(url.toString(), {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Failed to fetch blogs' }));
    throw new Error(err.message ?? 'Failed to fetch blogs');
  }

  const result = await response.json();
  return result.data;
}

export async function getBlog(id: string): Promise<Blog> {
  const response = await apiFetch(`/api/v1/blogs/${id}`);
  const result = await response.json();
  return result.data;
}

export async function createBlog(formData: FormData): Promise<Blog> {
  const response = await apiFetch('/api/v1/blogs', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  revalidatePath('/admin/blogs');
  return result.data;
}

export async function updateBlog(id: string, formData: FormData): Promise<Blog> {
  const response = await apiFetch(`/api/v1/blogs/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const result = await response.json();
  revalidatePath('/admin/blogs');
  return result.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiFetch(`/api/v1/blogs/${id}`, {
    method: 'DELETE',
  });
  revalidatePath('/admin/blogs');
}
