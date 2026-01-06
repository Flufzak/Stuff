import { palette } from "./palette";
import type { RootState } from "../store/store";

export function selectColors(state: RootState) {
  const isDark = state.theme.mode === "dark";

  return {
    primary: isDark ? palette.green : palette.pink,
    secondary: isDark ? palette.blue : palette.orange,

    background: isDark ? "#3f3f3fff" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#3f3f3fff",
    border: isDark ? "#2A2A2A" : "#E7E7E7",
    card: isDark ? "#3f3f3fff" : "#FFFFFF",
  };
}
