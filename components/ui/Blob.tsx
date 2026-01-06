import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

function LeftBlob() {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Path
        d="M0,0 C25,10 20,40 35,50 C55,65 40,90 0,100 Z"
        fill="#FFB0B0"
        opacity={0.9}
      />
    </Svg>
  );
}

function RightBlob() {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Path
        d="M100,0 C78,12 92,48 68,62 C48,80 72,96 100,100 Z"
        fill="#FFD09B"
        opacity={0.9}
      />
    </Svg>
  );
}

export default function Blob() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LeftBlob />
      <RightBlob />
    </View>
  );
}
