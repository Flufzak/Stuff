import React, { useMemo, useRef, useEffect } from "react";
import { Pressable, Animated } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectColors } from "../../styles/theme";
import { makeSelectIsFavorite } from "../../store/favoritesSelectors";
import { toggleFavorite } from "../../store/FavoriteSlice";

type Props = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  showLabel?: boolean;
};

export default function FavoriteButton({
  id,
  title,
  price,
  thumbnail,
  showLabel = true,
}: Props) {
  const dispatch = useAppDispatch();
  const colors = useAppSelector(selectColors);

  const selectIsFav = useMemo(() => makeSelectIsFavorite(id), [id]);
  const isFavorite = useAppSelector(selectIsFav);

  // pop animatie
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // kleine pop wanneer status verandert
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.25,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFavorite]);

  return (
    <Pressable
      onPress={() =>
        dispatch(
          toggleFavorite({
            id,
            title,
            price,
            thumbnail,
          })
        )
      }
    >
      <Container bg={colors.card} border={colors.border}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "#e53935" : colors.text}
          />
        </Animated.View>

        {showLabel ? (
          <Action>
            <AnimatedLabel visible={!isFavorite}>
              Add to favorites
            </AnimatedLabel>
            <AnimatedLabel visible={isFavorite}>
              Added to favorites
            </AnimatedLabel>
          </Action>
        ) : null}
      </Container>
    </Pressable>
  );
}

const Container = styled.View<{ bg: string; border: string }>`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: ${({ bg }) => bg};
  border-width: 1px;
  border-color: ${({ border }) => border};

  /* iOS shadow */
  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;

  /* Android */
  elevation: 4;
`;

const Action = styled.View`
  min-width: 160px;
  height: 24px;
  justify-content: center;
  overflow: hidden;
`;

const AnimatedLabel = styled(AppText)<{ visible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;
