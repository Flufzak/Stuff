import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useAppSelector } from "../store/hooks";
import { selectColors } from "../styles/theme";
import AppText from "./ui/AppText";

type Props = {
  title: string;
  description?: string;
  onPress?: () => void;
};

export default function ProfileActionCard({
  title,
  description,
  onPress,
}: Props) {
  const colors = useAppSelector(selectColors);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={{ flex: 1 }}>
        <AppText style={[styles.title, { color: colors.text }]}>
          {title}
        </AppText>

        {description ? (
          <AppText style={[styles.description, { color: colors.text }]}>
            {description}
          </AppText>
        ) : null}
      </View>

      <AppText style={[styles.chevron, { color: colors.text }]}>›</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
  },
  chevron: {
    fontSize: 24,
    opacity: 0.35,
  },
});
