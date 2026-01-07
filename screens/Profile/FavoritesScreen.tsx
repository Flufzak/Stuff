import React from "react";
import { StyleSheet, FlatList } from "react-native";
import ScreenLayout from "../../components/ui/ScreenLayout";
import AppText from "../../components/ui/AppText";
import ProductCard from "../../components/ProductCard";

import { useAppSelector } from "../../store/hooks";
import { selectFavoritesArray } from "../../store/favoritesSelectors";

import { useNavigation } from "@react-navigation/native";
import EmptyState from "../../components/EmptyState";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../navigation/types";
import { selectColors } from "../../styles/theme";

export default function FavoritesScreen() {
  const colors = useAppSelector(selectColors);

  const favorites = useAppSelector(selectFavoritesArray);
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  if (favorites.length === 0) {
    return (
      <ScreenLayout>
        <EmptyState title="You have no favorites yet">
          Mark{" "}
          <AppText
            style={{
              color: colors.tab,
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("HomeTab")}
          >
            Products
          </AppText>{" "}
          as favorite to see them here
        </EmptyState>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail ?? ""}
            onPress={() =>
              navigation.navigate("HomeTab", {
                screen: "ProductDetail",
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 120 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: "700" },
  muted: { marginTop: 8, opacity: 0.7, textAlign: "center" },
});
