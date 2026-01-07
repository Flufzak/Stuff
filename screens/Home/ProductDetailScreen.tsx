import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { fetchProduct } from "../../data/products";
import AppText from "../../components/ui/AppText";
import ScreenLayout from "../../components/ui/ScreenLayout";
import Loader from "../../components/ui/Loader";
import ProductDetailCard from "../../components/ProductDetailCard";
import AppButton from "../../components/ui/AppButton";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { View } from "react-native";
import FavoriteButton from "../../components/ui/FavoriteButton";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const { id } = route.params;
  const [showLoader, setShowLoader] = useState(true);

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (showLoader) {
    return <Loader />;
  }

  if (isError) return <AppText>Error loading product</AppText>;
  if (!data) return <AppText>Not found</AppText>;

  return (
    <ScreenLayout>
      <ProductDetailCard
        title={data.title}
        thumbnail={data.thumbnail}
        price={data.price}
        description={data.description}
      />
      <View style={{ alignSelf: "flex-start", marginTop: 10, marginLeft: 10 }}>
        <FavoriteButton
          id={id}
          title={data.title}
          price={data.price}
          thumbnail={data.thumbnail}
          showLabel
        />
      </View>

      <AppButton
        title="Add to cart"
        onPress={() =>
          dispatch(
            addToCart({
              id: data.id,
              title: data.title,
              price: data.price,
              thumbnail: data.thumbnail,
            })
          )
        }
      />
    </ScreenLayout>
  );
}
