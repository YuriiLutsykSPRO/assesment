import type { PaginatedResponse, Product } from "./models";
import { mockProducts } from "./products";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProductsBE = async (
  skip = 0,
  take = 10
): Promise<PaginatedResponse<Product>> => {
  await delay(2000);

  return {
    data: mockProducts.slice(skip, skip + take),
    skip,
    take,
    total: mockProducts.length,
  };
};

export const getProductByIdBE = async (id: string) => {
  await delay(2000);
  return mockProducts.find((product) => product.id === id);
};
