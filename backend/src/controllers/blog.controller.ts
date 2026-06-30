import { Request, Response } from 'express';
import { Blog } from '../models/Blog';
import type { IBlog, IBlogPaginationResponse } from '../types/blog.types';

function toBlogResponse(blog: {
  _id: { toString(): string };
  title: string;
  content: string;
  image?: string | null;
  authorId: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
}): IBlog {
  return {
    _id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    image: blog.image ?? null,
    authorId: blog.authorId.toString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };
}

export async function getAllBlogs(req: Request, res: Response): Promise<void> {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const size = Math.max(1, Math.min(50, parseInt(req.query.size as string) || 10));
  const search = (req.query.search as string)?.trim() || '';

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Blog.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / size));
  const skip = (page - 1) * size;

  const blogs = await Blog.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean()
    .exec();

  const data: IBlogPaginationResponse = {
    items: blogs.map(toBlogResponse),
    total,
    page,
    size,
    totalPages,
  };

  res.status(200).json({ success: true, data });
}

export async function getBlogById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const blog = await Blog.findById(id).lean().exec();
  if (!blog) {
    res.status(404).json({ success: false, message: 'Blog not found' });
    return;
  }

  res.status(200).json({ success: true, data: toBlogResponse(blog) });
}

export async function createBlog(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';

  if (!title || !content) {
    res.status(400).json({ success: false, message: 'Title and content are required' });
    return;
  }

  const blog = await Blog.create({
    title,
    content,
    authorId: req.user.userId,
  });

  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: toBlogResponse(blog),
  });
}

export async function updateBlog(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404).json({ success: false, message: 'Blog not found' });
    return;
  }

  const title = typeof req.body.title === 'string' ? req.body.title.trim() : blog.title;
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : blog.content;

  blog.title = title;
  blog.content = content;
  if (req.file) {
    blog.image = `/uploads/${req.file.filename}`;
  }
  await blog.save();

  res.status(200).json({
    success: true,
    message: 'Blog updated successfully',
    data: toBlogResponse(blog),
  });
}

export async function deleteBlog(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    res.status(404).json({ success: false, message: 'Blog not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'Blog deleted successfully' });
}
