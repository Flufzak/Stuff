import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../store/hooks"; // pas pad aan indien nodig
import { palette } from "../../styles/palette"; // pas pad aan indien nodig

function LeftBlob({ color }: { color: string }) {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Path
        d="M0,0 C25,10 20,40 35,50 C55,65 40,90 0,100 Z"
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
      <Path
        d="M100,0 C78,12 92,48 68,62 C48,80 72,96 100,100 Z"
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
