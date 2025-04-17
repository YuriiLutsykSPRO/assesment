import { getProduct, getProducts } from "@/src/data";
import type { Product } from "@/src/mockBE";
import { getUniqueProducts } from "@/src/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const TAKE = 10;

// TODO: extract logic to a generic hook
export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["products", skip, TAKE],
    queryFn: () => getProducts({ skip, take: TAKE }),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data) {
      setProducts((prev) => getUniqueProducts(prev, data.data));
      setHasMore(data.total > products.length);
    }
  }, [data]);

  const onLoadMore = () => {
    if (hasMore) {
      setSkip((prev) => prev + TAKE);
    }
  };

  const onRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  return {
    data: products,
    isFetching,
    isLoading,
    error,
    onLoadMore,
    onRefresh,
    isRefetching,
  };
};

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (id) {
        return getProduct(id);
      }
      return null;
    },
    enabled: !!id,
  });
};

export const useGetProductMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      if (id) {
        return await getProduct(id);
      }
      return;
    },
  });
};
