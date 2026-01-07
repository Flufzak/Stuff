import React, { useEffect, useMemo } from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated";
import { useAppSelector } from "../store/hooks";
import { selectColors } from "../styles/theme";

const BAR_HEIGHT = 56;
const BUBBLE = 44;
const ICON_SIZE = 22;
const H_PADDING = 28;

const NOTCH_RADIUS = (BUBBLE + 56) / 2;
const NOTCH_DEPTH = 42;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const colors = useAppSelector(selectColors);
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

  //  SEAMLESS NOTCH (smooth valley, geen knikken)
  const animatedPathProps = useAnimatedProps(() => {
    const W = screenWidth;
    const H = BAR_HEIGHT;

    const cx = bubbleX.value + BUBBLE / 2;

    const R = NOTCH_RADIUS;
    const D = NOTCH_DEPTH;
    const LIP = 12; // zachte overgang links/rechts

    const clampedCx = Math.max(R + LIP + 12, Math.min(W - R - LIP - 12, cx));

    const x1 = clampedCx - R;
    const x2 = clampedCx + R;

    const outer = `M 0 0 H ${W} V ${H} H 0 Z`;

    const notch = [
      `M ${x1 - LIP} 0`,
      `L ${x1} 0`,
      // links: horizontaal starten → geen knik
      `C ${x1 + R * 0.35} 0, ${clampedCx - R * 0.65} ${D}, ${clampedCx} ${D}`,
      // rechts: spiegel
      `C ${clampedCx + R * 0.65} ${D}, ${x2 - R * 0.35} 0, ${x2} 0`,
      `L ${x2 + LIP} 0`,
      `L ${x1 - LIP} 0`,
      `Z`,
    ].join(" ");

    return { d: `${outer} ${notch}` };
  });
  const animatedTopStrokeProps = useAnimatedProps(() => {
    const W = screenWidth;

    const cx = bubbleX.value + BUBBLE / 2;

    const R = NOTCH_RADIUS;
    const D = NOTCH_DEPTH;
    const LIP = 12;

    const clampedCx = Math.max(R + LIP + 12, Math.min(W - R - LIP - 12, cx));

    const x1 = clampedCx - R;
    const x2 = clampedCx + R;

    // Alleen de bovenrand met notch, geen rectangle
    const topStroke = [
      `M 0 0`,
      `H ${x1 - LIP}`,
      `L ${x1} 0`,
      `C ${x1 + R * 0.35} 0, ${clampedCx - R * 0.65} ${D}, ${clampedCx} ${D}`,
      `C ${clampedCx + R * 0.65} ${D}, ${x2 - R * 0.35} 0, ${x2} 0`,
      `L ${x2 + LIP} 0`,
      `H ${W}`,
    ].join(" ");

    return { d: topStroke };
  });

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      {/* BAR MET UITGESNEDEN CURVE */}
      <View style={{ height: BAR_HEIGHT, width: "100%" }}>
        <Svg width={screenWidth} height={BAR_HEIGHT}>
          <AnimatedPath
            animatedProps={animatedPathProps}
            fill={colors.tab}
            fillRule="evenodd"
            clipRule="evenodd"
          />
          {/* Stroke die de curve volgt */}
          <AnimatedPath
            animatedProps={animatedTopStrokeProps}
            fill="none"
            stroke={colors.border}
            strokeWidth={1}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.6}
          />
        </Svg>

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
                      opacity: 0,
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

      {/* BUBBLE */}
      <Animated.View
        style={[
          styles.bubble,
          {
            bottom: insets.bottom + BAR_HEIGHT - BUBBLE / 2 - 15,
            backgroundColor: colors.tab,
          },
          bubbleStyle,
        ]}
      >
        <Ionicons name={activeIcon} size={ICON_SIZE} color={colors.primary} />
      </Animated.View>

      {/* ANDROID SAFE AREA */}
      <View style={{ height: insets.bottom, backgroundColor: colors.tab }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    //  Android
    elevation: 8,
  },
});
