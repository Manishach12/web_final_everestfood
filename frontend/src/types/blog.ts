export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPagination {
  items: Blog[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
