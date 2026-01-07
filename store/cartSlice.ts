import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  quantity: number;
};

type CartState = {
  items: Record<number, CartItem>; // key = product id
  isLoading: boolean;
};

const initialState: CartState = {
  items: {},
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        thumbnail?: string;
      }>
    ) => {
      const { id, title, price, thumbnail } = action.payload;
      const existing = state.items[id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[id] = { id, title, price, thumbnail, quantity: 1 };
      }
    },

    incrementQty: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items[action.payload.id];
      if (item) item.quantity += 1;
    },

    decrementQty: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.items[action.payload.id];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) delete state.items[action.payload.id];
    },

    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      delete state.items[action.payload.id];
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, incrementQty, decrementQty, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
