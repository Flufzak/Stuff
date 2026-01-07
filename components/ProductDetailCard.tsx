import React, { useMemo } from "react";
import { View, Image } from "react-native";
import AppText from "./ui/AppText";
import { useAppSelector } from "../store/hooks";
import { selectColors } from "../styles/theme";
import { makeProductDetailCardStyles } from "../styles/cards";

type Props = {
  title: string;
  price: number;
  thumbnail: string;
  description: string;
};

export default function ProductDetailCard({
  title,
  price,
  thumbnail,
  description,
}: Props) {
  const colors = useAppSelector(selectColors);

  const styles = useMemo(
    () =>
      makeProductDetailCardStyles({
        card: colors.card,
        text: colors.text,
        border: colors.border,
        background: colors.background,
      }),
    [colors]
  );

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.body}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.price}>€ {price}</AppText>
        <AppText style={styles.description}>{description}</AppText>
      </View>
    </View>
  );
}
