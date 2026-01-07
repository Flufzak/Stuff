import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoriteItem = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
};

type FavoritesState = {
  items: Record<number, FavoriteItem>;
};

const initialState: FavoritesState = {
  items: {},
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const { id } = action.payload;
      if (state.items[id]) {
        delete state.items[id];
      } else {
        state.items[id] = action.payload;
      }
    },
    removeFavorite: (state, action: PayloadAction<{ id: number }>) => {
      delete state.items[action.payload.id];
    },
    clearFavorites: (state) => {
      state.items = {};
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
