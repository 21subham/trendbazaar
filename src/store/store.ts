import { Product } from "../../sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemsCount: () => number;
  getGrooupedItems: () => BasketItem[];
}

const useBasketStore = create()(
  persist(
    (set, get) => ({
      //item function
      item: [],

      //add item
      addItem: (product) =>
        set((state) => {
          const existingitem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingitem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      //remove item
    }),
    {
      name: "basket-store",
    }
  )
);
