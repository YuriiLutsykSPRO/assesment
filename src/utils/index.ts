import type { Product } from "../mockBE";
import type { CartItem } from "../store";

export type GetCartItemProps = {
  product: Product;
  size: string;
  color: string;
  stock: number;
};

export type GetCartItemIdProps = {
  productId: string;
  size: string;
  color: string;
};

export const getCartItem = ({
  product,
  size,
  color,
  stock,
}: GetCartItemProps): CartItem => {
  return {
    id: getCartItemId({ productId: product.id, size, color }),
    name: product.name,
    image: product.image,
    stock,
    price: product.price,
    size,
    color,
    quantity: 1,
  };
};

export const getCartItemId = ({
  productId,
  size,
  color,
}: GetCartItemIdProps) => {
  return `${productId}-${size}-${color}`;
};

export const getUniqueProducts = (
  oldProducts: Product[],
  newProducts: Product[]
) => {
  return [...oldProducts, ...newProducts].filter(
    (product, index, self) =>
      index === self.findIndex((t) => t.id === product.id)
  );
};
