import { mockProducts } from "./products";

type PaginatedResponse<T> = {
  data: T[];
  skip: number;
  take: number;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async (
  skip = 0,
  take = 10
): Promise<PaginatedResponse<(typeof mockProducts)[0]>> => {
  await delay(2000);

  return {
    data: mockProducts.slice(skip, skip + take),
    skip,
    take,
  };
};
