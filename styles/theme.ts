import { palette } from "./palette";
import type { RootState } from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectColors = createSelector(
  [(state: RootState) => state.theme.mode],
  (mode) => {
    const isDark = mode === "dark";

    return {
      primary: isDark ? palette.green : palette.pink,
      secondary: isDark ? palette.blue : palette.orange,

      background: isDark ? "#3f3f3fff" : "#f5f5f5ff",
      text: isDark ? "#FFFFFF" : "#3f3f3fff",
      border: isDark ? "#2A2A2A" : "#d6d5d5ff",
      card: isDark ? "rgb(71, 70, 70)" : "#FFFFFF",
      tab: isDark ? "#363636ff" : "#FFFFFF",
      muted: isDark ? "#3f3f3fff" : "#535353ff",
      red: isDark ? "#c05151ff" : "#a82525ff",
    };
  }
);
