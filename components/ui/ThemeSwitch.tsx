import React, { useEffect, useMemo, useRef } from "react";
import { Pressable, StyleSheet, View, Animated, Easing } from "react-native";

type ThemeSwitchProps = {
  value: boolean; // true = light, false = dark (of omgekeerd, kies jij)
  onChange: (next: boolean) => void;
  disabled?: boolean;
};

export default function ThemeSwitch({
  value,
  onChange,
  disabled,
}: ThemeSwitchProps) {
  const t = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(t, {
      toValue: value ? 1 : 0,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // we animate colors too
    }).start();
  }, [value, t]);

  const trackBg = t.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000000", "#62cff0"],
  });

  const thumbX = t.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 56], // tune if you change sizes
  });

  const thumbBg = t.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#ffa500"],
  });

  const moonHolesOpacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const starsOpacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const cloudsOpacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handlePress = () => {
    if (disabled) return;
    onChange(!value);
  };

  const stars = useMemo(
    () => [
      { top: 6, right: 28, size: 10, delay: 0 },
      { top: 18, right: 10, size: 7, delay: 120 },
      { top: 4, right: 14, size: 5, delay: 240 },
      { top: 26, right: 26, size: 6, delay: 360 },
      { top: 2, right: 50, size: 4, delay: 480 },
    ],
    []
  );

  return (
    <Pressable onPress={handlePress} disabled={disabled} style={styles.hit}>
      <View style={styles.frame}>
        <Animated.View style={[styles.track, { backgroundColor: trackBg }]}>
          {/* Stars */}
          <Animated.View style={[styles.starsLayer, { opacity: starsOpacity }]}>
            {stars.map((s, i) => (
              <TwinkleStar key={i} top={s.top} right={s.right} size={s.size} />
            ))}
          </Animated.View>

          {/* Clouds (light mode) */}
          <Animated.View
            style={[styles.cloudsLayer, { opacity: cloudsOpacity }]}
          >
            <View
              style={[
                styles.cloud,
                { top: 0, right: 14, width: 21, height: 21 },
              ]}
            />
            <View
              style={[
                styles.cloud,
                { top: 14, right: 6, width: 25, height: 25 },
              ]}
            />
            <View
              style={[
                styles.cloud,
                { top: 26, left: 4, width: 23, height: 23 },
              ]}
            />
            <View style={[styles.cloud, { top: 26, left: 20 }]} />
            <View style={[styles.cloud, { top: 30, left: 30 }]} />
            <View style={[styles.cloud, { top: 27, left: 46 }]} />
            <View style={[styles.cloud, { top: 31, left: 58 }]} />
          </Animated.View>

          {/* Thumb */}
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: thumbX }], backgroundColor: thumbBg },
            ]}
          >
            {/* moon holes */}
            <Animated.View
              style={[styles.moonHoles, { opacity: moonHolesOpacity }]}
            >
              <View
                style={[
                  styles.hole,
                  { top: 18, left: 6, width: 10, height: 10 },
                ]}
              />
              <View
                style={[
                  styles.hole,
                  { top: 28, left: 18, width: 5, height: 5 },
                ]}
              />
              <View
                style={[
                  styles.hole,
                  { top: 12, left: 20, width: 4, height: 4 },
                ]}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </Pressable>
  );
}

function TwinkleStar({
  top,
  right,
  size,
}: {
  top: number;
  right: number;
  size: number;
}) {
  const a = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(a, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(a, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [a]);

  const scale = a.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.15],
  });

  return (
    <Animated.View
      style={[
        styles.star,
        { top, right, width: size, height: size, transform: [{ scale }] },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  hit: { alignSelf: "flex-start" },
  frame: {
    width: 90,
    height: 40,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgb(58,58,58)",
    overflow: "hidden",
  },
  track: {
    flex: 1,
    borderRadius: 20,
  },
  thumb: {
    position: "absolute",
    left: 0,
    bottom: 5,
    width: 30,
    height: 30,
    borderRadius: 999,
    overflow: "hidden",
  },
  moonHoles: { flex: 1 },
  hole: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgb(85,85,85)",
  },
  starsLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  star: {
    position: "absolute",
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
  cloudsLayer: {
    position: "absolute",
    left: 6,
    top: 0,
    bottom: 0,
    width: 70,
  },
  cloud: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    opacity: 0.95,
  },
});
