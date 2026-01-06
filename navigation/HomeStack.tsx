import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "./types";

import ProductListScreen from "../screens/Home/ProductListScreen";
import ProductDetailScreen from "../screens/Home/ProductDetailScreen";
import HeaderThemeSwitch from "../components/ui/HeaderThemeSwitch";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      id="HomeStack"
      screenOptions={{
        headerRight: () => <HeaderThemeSwitch />,
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
}
