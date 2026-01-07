import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types";

import HomeStack from "./HomeStack";
import CartScreen from "../screens/Cart/CartScreen";
import CustomTabBar from "./CustomTabBar";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabs() {
  return (
    <Tab.Navigator
      id="RootTabs"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: "Profile", headerShown: false }}
      />
    </Tab.Navigator>
  );
}
