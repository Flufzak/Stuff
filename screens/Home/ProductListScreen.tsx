import React from "react";
import { FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { fetchProducts } from "../../data/products";
import AppText from "../../components/ui/AppText";
import ScreenLayout from "../../components/ui/ScreenLayout";
import Loader from "../../components/ui/Loader";
import ProductCard from "../../components/ProductCard";
import AppButton from "../../components/ui/AppButton";
import { addToCart } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";
import EmptyState from "../../components/EmptyState";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, refetch } = useQuery({
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
  if (!data?.products?.length) {
    return (
      <ScreenLayout>
        <EmptyState title="No products found">
          <AppText>Something went wrong while loading products.</AppText>

          <View>
            <AppButton title="Refresh" onPress={refetch} />
          </View>
        </EmptyState>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <FlatList
        data={data.products}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            onPress={() =>
              navigation.navigate("ProductDetail", { id: item.id })
            }
            action={
              <AppButton
                title="Add to cart"
                onPress={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      thumbnail: item.thumbnail,
                    })
                  )
                }
              />
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
