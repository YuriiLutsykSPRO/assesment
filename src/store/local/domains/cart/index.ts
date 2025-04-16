import type { Product } from "@/src/mockBE";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "../../storage";

interface CartState {
  items: Product[];
  total: number;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
}

interface CartActions {
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      addItem: (item: Product) =>
        set((state) => ({
          items: [...state.items, item],
          total: state.total + item.price,
        })),
      removeItem: (item: Product) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
          total: state.total - item.price,
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
