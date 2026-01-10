import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const selectCartItemsMap = (state: RootState) => state.cart.items;

export const selectCartItemsArray = createSelector(
  [selectCartItemsMap],
  (itemsMap) => Object.values(itemsMap)
);

export const selectTotalItems = createSelector(
  [selectCartItemsArray],
  (items) => items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectSubtotal = createSelector([selectCartItemsArray], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);
export const selectCartCount = (state: RootState) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);
