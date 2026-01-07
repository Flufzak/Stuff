import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../store/hooks";
import { selectColors } from "../styles/theme";
import AppText from "./ui/AppText";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function EmptyState({ children, title }: Props) {
  const colors = useAppSelector(selectColors);

  return (
    <View style={styles.center}>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.muted}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: "600" },
  muted: { opacity: 0.7, marginTop: 6 },
});
