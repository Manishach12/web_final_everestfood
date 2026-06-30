import { getBlog } from '@/app/actions/blogActions';
import EditBlogClient from './EditBlogClient';

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlog(id);

  return <EditBlogClient blog={blog} />;
}
