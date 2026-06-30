import { NextResponse } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

function rewriteUploadUrls(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map((item) =>
      item && typeof item === 'object' && 'image' in item && typeof item.image === 'string'
        ? { ...item, image: item.image.startsWith('/uploads/') ? `${API_URL}${item.image}` : item.image }
        : item,
    );
  }
  if (data && typeof data === 'object') {
    if ('user' in data && data.user && typeof data.user === 'object' && 'profileImage' in data.user && typeof data.user.profileImage === 'string') {
      return {
        ...data,
        user: {
          ...data.user,
          profileImage: data.user.profileImage.startsWith('/uploads/') ? `${API_URL}${data.user.profileImage}` : data.user.profileImage,
        },
      };
    }
    if ('item' in data && data.item && typeof data.item === 'object' && 'image' in data.item && typeof data.item.image === 'string') {
      return {
        ...data,
        item: {
          ...data.item,
          image: data.item.image.startsWith('/uploads/') ? `${API_URL}${data.item.image}` : data.item.image,
        },
      };
    }
    if ('items' in data && Array.isArray((data as { items: unknown[] }).items)) {
      return {
        ...data,
        items: (data as { items: unknown[] }).items.map((item) =>
          item && typeof item === 'object' && 'image' in item && typeof (item as { image?: string }).image === 'string'
            ? { ...item, image: (item as { image: string }).image.startsWith('/uploads/') ? `${API_URL}${(item as { image: string }).image}` : (item as { image: string }).image }
            : item,
        ),
      };
    }
  }
  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const path = queryString ? `/api/v1/items?${queryString}` : '/api/v1/items';
  const response = await proxyToBackend(path, { method: 'GET' });
  if (response.ok) {
    try {
      const data = await response.json();
      return NextResponse.json(rewriteUploadUrls(data));
    } catch {}
  }
  return response;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const response = await proxyToBackend('/api/v1/items', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    try {
      const data = await response.json();
      return NextResponse.json(rewriteUploadUrls(data));
    } catch {}
  }
  return response;
}
