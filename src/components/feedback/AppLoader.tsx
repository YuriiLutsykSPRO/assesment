import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  type ColorValue,
} from "react-native";

type Props = {
  visible: boolean;
  color?: ColorValue;
  size?: ActivityIndicatorProps["size"];
};

export const AppLoader = ({ visible, size = "large" }: Props) => {
  return (
    <ActivityIndicator animating={visible} color={"#3B82F6"} size={size} />
  );
};
