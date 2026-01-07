import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useAppSelector } from "../../store/hooks";
import { palette } from "../../styles/palette";

function LeftBlob({ color }: { color: string }) {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Grote linker vorm met golvende binnenrand */}
      <Path
        d="
          M0,0
          L0,100
          L28,100
          C40,90 30,78 34,68
          C38,55 52,48 40,36
          C28,24 42,12 32,0
          Z
        "
        fill={color}
        opacity={0.9}
      />
    </Svg>
  );
}

function RightBlob({ color }: { color: string }) {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Smalle rechter vorm met lichte golf */}
      <Path
        d="
          M100,0
          L100,100
          L86,100
          C82,88 90,74 88,62
          C86,48 80,40 84,26
          C87,16 82,8 86,0
          Z
        "
        fill={color}
        opacity={0.9}
      />
    </Svg>
  );
}

export default function Blob() {
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const leftColor = isDark ? palette.green : palette.pink;
  const rightColor = isDark ? palette.blue : palette.orange;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LeftBlob color={leftColor} />
      <RightBlob color={rightColor} />
    </View>
  );
}
