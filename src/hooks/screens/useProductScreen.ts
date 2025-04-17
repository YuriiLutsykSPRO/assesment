import { AppSnackbar } from "@/src/components";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../useCart";
import { useGetProduct } from "@/src/store/remote";
import { getCartItemId } from "@/src/utils";

export const useProductScreen = () => {
  const { id } = useLocalSearchParams();
  const [isRefetching, setIsRefetching] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<{
    color: string;
    size: string;
  } | null>(null);

  const { items, removeItem, addItem } = useCart();
  const { data: product, isLoading, refetch } = useGetProduct(id as string);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const onRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const isInCart = useMemo(() => {
    if (!product || !selectedVariant) return false;
    const id = getCartItemId({
      productId: product?.id,
      size: selectedVariant?.size,
      color: selectedVariant?.color,
    });
    return items.some((item) => item.id === id);
  }, [items, product, selectedVariant]);

  const isOutOfStock = useMemo(() => {
    if (!product || !selectedVariant) return true;
    const item = product.variants.find(
      (v) =>
        v.color === selectedVariant.color && v.size === selectedVariant.size
    );

    if (!item) return true;
    return item.stock < 1;
  }, [product, selectedVariant]);

  const allColors = useMemo(() => {
    return [...new Set(product?.variants.map((v) => v.color))];
  }, [product]);
  const allSizes = useMemo(() => {
    return [...new Set(product?.variants.map((v) => v.size))];
  }, [product]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const variant = product.variants.find(
      (v) =>
        v.color === selectedVariant.color && v.size === selectedVariant.size
    );

    if (variant && variant.stock > 0) {
      addItem({
        product,
        size: selectedVariant.size,
        color: selectedVariant.color,
        stock: variant.stock,
      });
      AppSnackbar.show({
        type: "success",
        text: "Added to cart",
      });
    } else {
      AppSnackbar.show({
        type: "error",
        text: "Selected variant is out of stock",
      });
    }
  };

  const handleRemoveFromCart = () => {
    if (!product || !selectedVariant) return;
    const id = getCartItemId({
      productId: product.id,
      size: selectedVariant.size,
      color: selectedVariant.color,
    });
    removeItem(id);
  };

  return {
    isInCart,
    isOutOfStock,
    allColors,
    allSizes,
    handleAddToCart,
    handleRemoveFromCart,
    isLoading,
    product,
    selectedVariant,
    setSelectedVariant,
    isRefetching,
    onRefresh,
  };
};
