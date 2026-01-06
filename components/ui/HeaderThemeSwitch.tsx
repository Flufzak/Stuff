import React from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/themeSlice";
import ThemeSwitch from "./ThemeSwitch";

export default function HeaderThemeSwitch() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <View style={{ marginRight: 8 }}>
      <ThemeSwitch
        value={theme === "light"}
        onChange={() => dispatch(toggleTheme())}
      />
    </View>
  );
}
