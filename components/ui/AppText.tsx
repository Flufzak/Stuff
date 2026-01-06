import { Text, TextProps } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { selectColors } from "../../styles/theme";

export default function AppText(props: TextProps) {
  const colors = useAppSelector(selectColors);

  return (
    <Text
      {...props}
      style={[
        { fontFamily: "Montserrat_400Regular", color: colors.text },
        props.style,
      ]}
    />
  );
}
