import React, { useMemo, useRef } from "react";
import { Pressable, Animated } from "react-native";
import AppText from "./AppText";
import { useAppSelector } from "../../store/hooks";
import { selectColors } from "../../styles/theme";
import { ButtonWrapper, Glow } from "../../styles/button";

type Props = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
  const colors = useAppSelector(selectColors);

  const anim = useRef(new Animated.Value(0)).current; // 0 -> 1 bij press

  const handlePressIn = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 140,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const glowStyle = useMemo(
    () => ({
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.16],
      }),
      transform: [
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.25],
          }),
        },
      ],
    }),
    [anim]
  );

  const buttonScaleStyle = useMemo(
    () => ({
      transform: [
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.97],
          }),
        },
      ],
    }),
    [anim]
  );

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={buttonScaleStyle}>
        <ButtonWrapper bg={colors.card} border={colors.border}>
          <Glow
            style={[
              glowStyle,
              {
                backgroundColor: colors.text,
              },
            ]}
            pointerEvents="none"
          />

          <AppText style={{ color: colors.text, zIndex: 2 }}>{title}</AppText>
        </ButtonWrapper>
      </Animated.View>
    </Pressable>
  );
}
