import React from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { decrementQty, incrementQty, removeItem } from "../../store/cartSlice";
import {
  selectCartItemsArray,
  selectSubtotal,
  selectTotalItems,
} from "../../store/selectors";
import AppText from "../../components/ui/AppText";
import ScreenLayout from "../../components/ui/ScreenLayout";
import Loader from "../../components/ui/Loader";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../navigation/types";
import { selectColors } from "../../styles/theme";
import EmptyState from "../../components/EmptyState";

export default function CartScreen({
  navigation,
}: BottomTabScreenProps<RootTabParamList, "Cart">) {
  const dispatch = useAppDispatch();
  const colors = useAppSelector(selectColors);

  const loading = useAppSelector((s) => s.cart.isLoading);
  const items = useAppSelector(selectCartItemsArray);
  const subtotal = useAppSelector(selectSubtotal);
  const totalItems = useAppSelector(selectTotalItems);

  if (loading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  if (items.length === 0) {
    return (
      <ScreenLayout>
        <EmptyState title="Your cart is empty 🛒">
          Add something from{" "}
          <AppText
            style={{
              color: colors.primary,
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("HomeTab")}
          >
            Products
          </AppText>
          .
        </EmptyState>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={items}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <AppText style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </AppText>
                <AppText style={styles.muted}>
                  € {item.price.toFixed(2)} each
                </AppText>

                <View style={styles.row}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => dispatch(decrementQty({ id: item.id }))}
                  >
                    <AppText style={styles.qtyBtnText}>-</AppText>
                  </Pressable>

                  <AppText style={styles.qty}>{item.quantity}</AppText>

                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => dispatch(incrementQty({ id: item.id }))}
                  >
                    <AppText style={styles.qtyBtnText}>+</AppText>
                  </Pressable>

                  <View style={{ flex: 1 }} />

                  <Pressable
                    style={styles.removeBtn}
                    onPress={() => dispatch(removeItem({ id: item.id }))}
                  >
                    <AppText style={styles.removeText}>Remove</AppText>
                  </Pressable>
                </View>
              </View>

              <AppText style={styles.lineTotal}>
                € {(item.price * item.quantity).toFixed(2)}
              </AppText>
            </View>
          )}
        />

        <View style={styles.summary}>
          <AppText style={styles.summaryText}>Items: {totalItems}</AppText>
          <AppText style={styles.summaryText}>
            Subtotal: € {subtotal.toFixed(2)}
          </AppText>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 90 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: "600" },
  muted: { opacity: 0.7, marginTop: 6 },

  card: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10 },

  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "700" },
  qty: { minWidth: 26, textAlign: "center", fontSize: 16, fontWeight: "600" },

  removeBtn: { paddingHorizontal: 10, paddingVertical: 8 },
  removeText: { color: "#b00020", fontWeight: "600" },

  lineTotal: { fontWeight: "700", alignSelf: "center" },

  summary: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: { fontSize: 16, fontWeight: "700" },
  link: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
