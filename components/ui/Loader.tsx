import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Animated, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette } from "../../styles/palette";

type LoaderProps = {
  size?: number; // diameter van elke circle
  gap?: number; // afstand tussen circles
  durationMs?: number; // snelheid
  style?: ViewStyle;
};
const pastelExtras = {
  lilac: "#D7C6FF",
  mint: "#BFE6D3",
  butter: "#FFF1B8",
  peach: "#FFD6C8",
  sky: "#BFD9FF",
};

const GRADIENTS: [string, string][] = [
  [palette.pink, pastelExtras.peach],
  [palette.orange, pastelExtras.butter],
  [palette.green, pastelExtras.mint],
  [palette.blue, pastelExtras.sky],
  [pastelExtras.lilac, palette.pink],
];

export default function Loader({
  size = 18,
  gap = 12,
  durationMs = 1200,
  style,
}: LoaderProps) {
  const scales = useRef([...Array(5)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = scales.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, {
            toValue: 1,
            duration: durationMs / 2,
            useNativeDriver: true,
            delay: i * 200,
          }),
          Animated.timing(v, {
            toValue: 0,
            duration: durationMs / 2,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, [scales, durationMs]);

  const circleStyle = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      marginRight: gap,
    }),
    [size, gap]
  );

  return (
    <View style={styles.wrap}>
      <View style={[styles.row, style]}>
        {scales.map((v, idx) => {
          const scale = v.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          });

          const opacity = v.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
          });

          return (
            <Animated.View
              key={idx}
              style={[
                { transform: [{ scale }], opacity },
                // laatste heeft geen marginRight
                idx === scales.length - 1 ? { marginRight: 0 } : null,
              ]}
            >
              <LinearGradient
                colors={GRADIENTS[idx]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={circleStyle}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
