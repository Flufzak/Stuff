import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useAppSelector } from "../../store/hooks";
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

import CartSummaryCard from "./components/CartSummaryCard";
import CartItemCard from "./components/CartItemRow";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function CartScreen({
  navigation,
}: BottomTabScreenProps<RootTabParamList, "Cart">) {
  const colors = useAppSelector(selectColors);
  const tabBarHeight = useBottomTabBarHeight();

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
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <CartItemCard item={item} colors={colors} />
          )}
        />

        <View style={{ paddingBottom: tabBarHeight }}>
          <CartSummaryCard
            subtotal={subtotal}
            totalItems={totalItems}
            colors={colors}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // FlatList neemt alle beschikbare ruimte
  list: { flex: 1 },
  listContent: { padding: 16 },
});
