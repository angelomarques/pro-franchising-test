import { ProductType } from "@/types/product";
import { create } from "zustand";

interface CartState {
  products: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: [],
  addToCart: (item) =>
    set((state) => ({ ...state, products: [...state.products, item] })),
  removeFromCart: (id) =>
    set((state) => ({
      ...state,
      products: state.products.filter((item) => item.id !== id),
    })),
  emptyCart: () => set((state) => ({ ...state, products: [] })),
}));
