import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const selectFavoritesMap = (state: RootState) => state.favorites.items;

export const selectFavoritesArray = createSelector(
  [selectFavoritesMap],
  (map) => Object.values(map)
);

export const makeSelectIsFavorite = (id: number) => (state: RootState) =>
  Boolean(state.favorites.items[id]);
