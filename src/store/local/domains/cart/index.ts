import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "../../storage";
import type { CartItem } from "@/src/store";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// SELECTORS OR COMPUTED VALUES ???
export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const isInCart = get()?.items?.some((i) => i.id === item.id);

        if (isInCart) {
          return set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        }
        return set((state) => ({
          items: [...state.items, item],
        }));
      },
      removeItem: (itemId: string) =>
        set((state) => {
          const item = state.items.find((i) => i.id === itemId);
          if (!item) return state;
          return {
            items: state.items.filter((i) => i.id !== itemId),
          };
        }),
      updateQuantity: (itemId: string, quantity: number) =>
        set((state) => {
          const item = state.items.find((item) => item.id === itemId);
          if (!item) return state;
          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
