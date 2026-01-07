import React, { useMemo } from "react";
import { Image, Pressable, View } from "react-native";
import AppText from "./ui/AppText";
import { useAppSelector } from "../store/hooks";
import { selectColors } from "../styles/theme";
import { makeProductCardStyles } from "../styles/cards";

type Props = {
  title: string;
  price: number;
  thumbnail: string;
  onPress?: () => void;
  action?: React.ReactNode;
};

export default function ProductCard({
  title,
  price,
  thumbnail,
  onPress,
  action,
}: Props) {
  const colors = useAppSelector(selectColors);

  const styles = useMemo(
    () =>
      makeProductCardStyles({
        card: colors.card,
        text: colors.text,
        border: colors.border,
      }),
    [colors]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textBlock}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>

          <AppText style={styles.price}>€ {price}</AppText>

          {action ? <View style={styles.action}>{action}</View> : null}
        </View>

        <AppText style={styles.chevron}>›</AppText>
      </View>
    </Pressable>
  );
}
