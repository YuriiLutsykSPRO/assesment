export type ProductVariant = {
  color: string;
  size: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  variants: ProductVariant[];
};

export type Pagination = {
  skip: number;
  take: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
} & Pagination;
