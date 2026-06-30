export interface IBlog {
  _id: string;
  title: string;
  content: string;
  image?: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPaginationResponse {
  items: IBlog[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
