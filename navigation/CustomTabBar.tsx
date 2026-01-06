import React, { useEffect, useMemo } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated";
import { palette } from "../styles/palette";

const BAR_HEIGHT = 56;
const BUBBLE = 44;
const ICON_SIZE = 22;
const H_PADDING = 28;

// Notch groter dan bubble (zoals screenshot)
const NOTCH_RADIUS = (BUBBLE + 25) / 2;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;

  const tabCount = state.routes.length;

  const tabWidth = useMemo(() => {
    const usable = screenWidth - H_PADDING * 2;
    return usable / tabCount;
  }, [screenWidth, tabCount]);

  const centerXForIndex = (index: number) =>
    H_PADDING + tabWidth * index + tabWidth / 2;

  const bubbleX = useSharedValue(centerXForIndex(state.index) - BUBBLE / 2);

  useEffect(() => {
    bubbleX.value = withTiming(centerXForIndex(state.index) - BUBBLE / 2, {
      duration: 360,
    });
  }, [state.index]);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: bubbleX.value }],
  }));

  const getIcon = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case "HomeTab":
        return focused ? "home" : "home-outline";
      case "Cart":
        return focused ? "cart" : "cart-outline";
      case "Profile":
        return focused ? "person" : "person-outline";
      default:
        return focused ? "ellipse" : "ellipse-outline";
    }
  };

  const activeRouteName = state.routes[state.index]?.name ?? "";
  const activeIcon = getIcon(
    activeRouteName,
    true
  ) as keyof typeof Ionicons.glyphMap;

  // SVG notch path animatie (dynamisch path string)
  const animatedPathProps = useAnimatedProps(() => {
    const W = screenWidth;
    const H = BAR_HEIGHT;

    // bubble center X
    const cx = bubbleX.value + BUBBLE / 2;

    // notch grootte/shape
    const R = NOTCH_RADIUS; // half breedte van notch
    const D = 40; // diepte van de U

    // clamp zodat notch niet buiten scherm gaat
    const clampedCx = Math.max(R + 12, Math.min(W - R - 12, cx));
    const x1 = clampedCx - R;
    const x2 = clampedCx + R;

    // Control points voor smooth U (2 cubics)
    const c1x = x1 + R * 0.55;
    const c2x = x2 - R * 0.55;
    const midx = clampedCx;

    // 1) Outer rect (de balk)
    const outer = `M 0 0 H ${W} V ${H} H 0 Z`;

    // 2) Inner notch (dit wordt het “gat” door evenodd)
    // Start links op de bovenrand, duik naar beneden tot D, terug omhoog naar rechts.
    const notch = [
      `M ${x1} 0`,
      `C ${x1} 0, ${x1} ${D}, ${midx} ${D}`, // links -> midden (diepste punt)
      `C ${x2} ${D}, ${x2} 0, ${x2} 0`, // midden -> rechts terug omhoog
      `L ${x1} 0`,
      `Z`,
    ].join(" ");

    return { d: `${outer} ${notch}` };
  });
  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      {/* De balk zelf (SVG met echte notch) */}
      <View style={{ height: BAR_HEIGHT, width: "100%" }}>
        <Svg width={screenWidth} height={BAR_HEIGHT} style={styles.svgShadow}>
          <AnimatedPath
            animatedProps={animatedPathProps}
            fill="#fff"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </Svg>

        {/* Tabs bovenop de bar */}
        <View
          style={[
            styles.row,
            { paddingHorizontal: H_PADDING, height: BAR_HEIGHT },
          ]}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconName = getIcon(
              route.name,
              false
            ) as keyof typeof Ionicons.glyphMap;

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={[styles.tab, { width: tabWidth, height: BAR_HEIGHT }]}
              >
                {isFocused ? (
                  <View
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                    }}
                  />
                ) : (
                  <Ionicons name={iconName} size={ICON_SIZE} color="#9AA0A6" />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Bubble met actief icoon */}
      <Animated.View
        style={[
          styles.bubble,
          { bottom: insets.bottom + BAR_HEIGHT - BUBBLE / 2 - 12 },
          bubbleStyle,
        ]}
      >
        <Ionicons name={activeIcon} size={ICON_SIZE} color={palette.pink} />
      </Animated.View>
      <View style={{ height: insets.bottom, backgroundColor: "#fff" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparant",
  },
  row: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    position: "absolute",
    left: 0,
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: BUBBLE / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 10 },
      },
      android: {
        elevation: 16,
      },
    }),
  },
  // schaduw voor de bar (Svg zelf heeft geen elevation, dus we zetten shadow op wrapper)
  svgShadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -6 },
    },
    android: {
      // android shadow voor svg: wrap in view met elevation is lastig;
      // meestal “goed genoeg” met bubble elevation + lichte border.
    },
  }) as any,
});
