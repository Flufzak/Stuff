import React from "react";
import { View, StyleSheet } from "react-native";
import ScreenLayout from "../../components/ui/ScreenLayout";
import AppText from "../../components/ui/AppText";

export default function FavoritesScreen() {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <AppText style={styles.title}>Favorites</AppText>
        <AppText style={styles.muted}>
          Hier komen je favoriete producten.
        </AppText>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700" },
  muted: { marginTop: 8, opacity: 0.7 },
});
