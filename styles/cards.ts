import { StyleSheet } from "react-native";

export const makeProductCardStyles = (colors: {
  card: string;
  text: string;
  border: string;
}) =>
  StyleSheet.create({
    card: {
      padding: 14,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    pressed: {
      opacity: 0.75,
      transform: [{ scale: 0.99 }],
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    textBlock: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 16,
      color: colors.text,
    },
    price: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
    },
    chevron: {
      fontSize: 22,
      color: colors.text,
      opacity: 0.35,
    },
  });
