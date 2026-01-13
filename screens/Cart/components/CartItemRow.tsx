import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  decrementQty,
  incrementQty,
  removeItem,
} from "../../../store/cartSlice";
import AppText from "../../../components/ui/AppText";
import { selectColors } from "../../../styles/theme";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
  const colors = useAppSelector(selectColors);

  const dispatch = useAppDispatch();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={{ flex: 1 }}>
        <AppText
          style={[styles.itemTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.title}
        </AppText>

        <AppText style={[styles.muted, { color: colors.muted }]}>
          € {item.price.toFixed(2)} each
        </AppText>

        <View style={styles.row}>
          <Pressable
            style={[styles.qtyBtn, { backgroundColor: colors.background }]}
            onPress={() => dispatch(decrementQty({ id: item.id }))}
          >
            <AppText style={[styles.qtyBtnText, { color: colors.text }]}>
              -
            </AppText>
          </Pressable>

          <AppText style={[styles.qty, { color: colors.text }]}>
            {item.quantity}
          </AppText>

          <Pressable
            style={[styles.qtyBtn, { backgroundColor: colors.background }]}
            onPress={() => dispatch(incrementQty({ id: item.id }))}
          >
            <AppText style={[styles.qtyBtnText, { color: colors.text }]}>
              +
            </AppText>
          </Pressable>

          <View style={{ flex: 1 }} />

          <Pressable
            style={styles.removeBtn}
            onPress={() => dispatch(removeItem({ id: item.id }))}
          >
            <AppText style={[styles.removeText, { color: colors.red }]}>
              Remove
            </AppText>
          </Pressable>
        </View>
      </View>

      <AppText style={[styles.lineTotal, { color: colors.text }]}>
        € {(item.price * item.quantity).toFixed(2)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  muted: { opacity: 0.8, marginTop: 6 },

  card: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,

    // theme invult dit:
    borderWidth: StyleSheet.hairlineWidth,
  },

  itemTitle: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10 },

  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "700" },
  qty: { minWidth: 26, textAlign: "center", fontSize: 16, fontWeight: "600" },

  removeBtn: { paddingHorizontal: 10, paddingVertical: 8 },
  removeText: { fontWeight: "600" },

  lineTotal: { fontWeight: "700", alignSelf: "center" },
});
