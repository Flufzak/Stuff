import React, { useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import ScreenLayout from "../../components/ui/ScreenLayout";
import AppText from "../../components/ui/AppText";
import ProfileActionCard from "../../components/ProfileActionCard";

import { useAppSelector } from "../../store/hooks";
import { selectColors } from "../../styles/theme";
import type { ProfileStackParamList } from "../../navigation/ProfileStack";

type Props = NativeStackScreenProps<ProfileStackParamList, "ProfileHome">;

export default function ProfileScreen({ navigation }: Props) {
  const colors = useAppSelector(selectColors);
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Image
          source={require("../../assets/pfp.png")}
          style={styles.avatar}
          resizeMode="cover"
          accessibilityLabel="Profile picture"
        />

        <View style={styles.nameBlock}>
          <AppText style={styles.firstName}>Suzanna</AppText>
          <AppText style={styles.lastName}>Khachatryan</AppText>
        </View>
      </View>

      <View style={styles.section}>
        <ProfileActionCard
          title="Favorites"
          description="View your saved products here"
          onPress={() => navigation.navigate("Favorites")}
        />
        <ProfileActionCard title="Discover more" description="More..." />
      </View>
    </ScreenLayout>
  );
}

function makeStyles(colors: { text: string; border: string }) {
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 12,
    },
    avatar: {
      width: 74,
      height: 74,
      borderRadius: 14,
      backgroundColor: colors.border,
    },
    nameBlock: {
      flex: 1,
      gap: 2,
    },
    firstName: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "700",
    },
    lastName: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "700",
    },
    subtitle: {
      marginTop: 6,
      opacity: 0.7,
      color: colors.text,
    },
    section: {
      marginTop: 14,
    },
  });
}
