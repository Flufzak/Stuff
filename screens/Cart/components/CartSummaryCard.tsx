import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../../components/ui/AppText";

type ThemeColors = {
  card: string;
  border: string;
  text: string;
};

type Props = {
  totalItems: number;
  subtotal: number;
  colors: ThemeColors;
};

export default function CartSummaryCard({
  totalItems,
  subtotal,
  colors,
}: Props) {
  return (
    <View
      style={[
        styles.summary,
        { backgroundColor: colors.card, borderTopColor: colors.border },
      ]}
    >
      <AppText style={[styles.summaryText, { color: colors.text }]}>
        Items: {totalItems}
      </AppText>
      <AppText style={[styles.summaryText, { color: colors.text }]}>
        Total: € {subtotal.toFixed(2)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: { fontSize: 16, fontWeight: "700" },
});
