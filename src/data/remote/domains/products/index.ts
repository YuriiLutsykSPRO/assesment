import type { PaginatedResponse, Pagination, Product } from "@/src/mockBE";
import { getProductByIdBE, getProductsBE } from "@/src/mockBE/api";

export const getProducts = async ({
  skip = 0,
  take = 10,
}: Pagination): Promise<PaginatedResponse<Product>> => {
  // Fake request to get products
  await fetch("https://fakestoreapi.com/products");

  const response = await getProductsBE(skip, take);
  return response;
};

export const getProduct = async (id: string) => {
  await fetch("https://fakestoreapi.com/products");

  const response = await getProductByIdBE(id);
  return response;
};
