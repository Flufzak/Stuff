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
    imageWrapper: {
      width: 72,
      height: 72,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: colors.card,
    },

    image: {
      width: "100%",
      height: "100%",
    },
    description: {
      fontSize: 13,
      color: colors.text,
      opacity: 0.75,
      marginTop: 4,
    },
  });
export const makeProductDetailCardStyles = (colors: {
  card: string;
  text: string;
  border: string;
  background: string;
}) =>
  StyleSheet.create({
    card: {
      borderRadius: 18,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    imageWrapper: {
      width: "100%",
      height: 250,
      backgroundColor: colors.border,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    body: {
      padding: 14,
      gap: 8,
    },
    title: {
      fontSize: 18,
      color: colors.text,
    },
    price: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
    },
    description: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.75,
      lineHeight: 20,
    },
  });
