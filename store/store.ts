import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import themeSliceReducer from "./themeSlice";
import favoritesReducer from "./FavoriteSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeSliceReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
