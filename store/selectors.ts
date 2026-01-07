import type { RootState } from "./store";

export const selectCartItemsArray = (state: RootState) =>
  Object.values(state.cart.items);

export const selectTotalItems = (state: RootState) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: RootState) =>
  Object.values(state.cart.items).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
