import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import AppText from "../../../components/ui/AppText";
import { useAppDispatch } from "../../../store/hooks";
import { clearCart } from "../../../store/cartSlice";

type ThemeColors = {
  card: string;
  border: string;
  text: string;
  red: string;
  background: string;
  primary: string;
  secondary: string;
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
  const dispatch = useAppDispatch();
  return (
    <View
      style={[
        styles.summary,
        { backgroundColor: colors.card, borderTopColor: colors.border },
      ]}
    >
      <Pressable
        onPress={() => dispatch(clearCart())}
        style={({ pressed }) => [
          styles.clearBtn,
          {
            backgroundColor: colors.card,
            borderColor: colors.secondary,
            opacity: pressed ? 0.78 : 1,
          },
        ]}
      >
        <AppText style={{ color: colors.primary }}>Clear cart</AppText>
      </Pressable>

      <View style={styles.rightBlock}>
        <AppText style={[styles.summaryText, { color: colors.text }]}>
          Items: {totalItems}
        </AppText>

        <AppText style={[styles.summaryText, { color: colors.text }]}>
          Total: € {subtotal.toFixed(2)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: { fontSize: 16 },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: "800",
  },
  rightBlock: {
    alignItems: "flex-end",
    gap: 6,
  },
});
