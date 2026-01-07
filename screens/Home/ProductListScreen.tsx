import React from "react";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { fetchProducts } from "../../data/products";
import AppText from "../../components/ui/AppText";
import ScreenLayout from "../../components/ui/ScreenLayout";
import Loader from "../../components/ui/Loader";
import ProductCard from "../../components/ProductCard";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }
  if (isError) return <AppText>Error loading products</AppText>;
  if (!data?.products?.length) return <AppText>No products found</AppText>;

  return (
    <ScreenLayout>
      <FlatList
        data={data.products}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            onPress={() =>
              navigation.navigate("ProductDetail", { id: item.id })
            }
          />
        )}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />
    </ScreenLayout>
  );
}
