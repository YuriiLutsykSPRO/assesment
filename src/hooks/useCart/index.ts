import { getCartItem, type GetCartItemProps } from "@/src/utils";
import { AppSnackbar } from "../../components/feedback";
import { removeItemModal } from "../../components/bussiness/RemoveItemModal";
import { useCartStore } from "../../store";

// IF we want check if the product is out of stock, we can use websocket to listen to the product stock changes
import { getTotalPrice } from "@/src/store/local/domains/cart/utils";
import { useState } from "react";
// Or debounced check the product stock every 5 seconds

export const useCart = () => {
  const { items, clearCart, addItem, removeItem, updateQuantity } =
    useCartStore();
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const totalPrice = useCartStore((state) => getTotalPrice(state.items));
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const handleAddToCart = (props: GetCartItemProps) => {
    addItem(getCartItem(props));
  };

  const onConfirmPress = (productId: string) => {
    removeItem(productId);
    AppSnackbar.show({
      text: "Item removed from cart",
      type: "info",
    });
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    const product = items.find((item) => item.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      removeItemModal({
        onCancelPress: () => {},
        onConfirmPress: () => onConfirmPress(productId),
      });

      return;
    }

    if (quantity > product.stock) {
      setIsOutOfStock(true);
      AppSnackbar.show({
        text: "Quantity is greater than the stock",
        type: "error",
      });
      return;
    }
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemModal({
      onCancelPress: () => {},
      onConfirmPress: () => onConfirmPress(productId),
    });
  };

  return {
    items,
    totalPrice,
    totalQuantity,
    clearCart,
    addItem: handleAddToCart,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    isOutOfStock,
    setIsOutOfStock,
  };
};
