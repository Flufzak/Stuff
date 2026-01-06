import React from "react";
import { View, StyleSheet } from "react-native";
import Blob from "./Blob";
import { selectColors } from "../../styles/theme";
import { useAppSelector } from "../../store/hooks";

type Props = {
  children: React.ReactNode;
};

export default function ScreenLayout({ children }: Props) {
  const colors = useAppSelector(selectColors);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Blob />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
