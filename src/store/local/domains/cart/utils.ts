import type { CartItem } from "../../models";

export const updateTotal = (
  quantity: number,
  nextQuantity: number,
  price: number
) => {
  if (quantity === nextQuantity) return;

  if (quantity > nextQuantity) {
    return quantity * price - nextQuantity * price;
  }

  return quantity * price + nextQuantity * price;
};

export const getTotalPrice = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
