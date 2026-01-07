import styled from "styled-components/native";
import { Animated } from "react-native";

export const ButtonWrapper = styled.View<{
  bg: string;
  border: string;
}>`
  position: relative;
  height: 52px;
  padding: 0 32px;
  border-radius: 999px;
  background-color: ${({ bg }) => bg};
  border-width: 1px;
  border-color: ${({ border }) => border};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-vertical: 15px;

  /* iOS shadow */
  shadow-color: #000;
  shadow-opacity: 0.18;
  shadow-radius: 12px;
  shadow-offset: 0px 6px;

  /* Android */
  elevation: 8;
`;

export const Glow = styled(Animated.View)`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 999px;
`;
