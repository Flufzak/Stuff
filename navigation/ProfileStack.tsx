import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import FavoritesScreen from "../screens/Profile/FavoritesScreen";
import HeaderThemeSwitch from "../components/ui/HeaderThemeSwitch";

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      id="ProfileStack"
      screenOptions={{
        headerRight: () => <HeaderThemeSwitch />,
      }}
    >
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
    </Stack.Navigator>
  );
}
