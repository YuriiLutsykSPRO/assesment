import { interpolate } from "react-native-reanimated";

import { useAnimatedStyle, withSpring } from "react-native-reanimated";

import { useSharedValue } from "react-native-reanimated";

export const useScaleAnimation = () => {
  const animation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animation.value }],
  }));

  const onPressIn = () => {
    animation.value = withSpring(0.8);
  };

  const onPressOut = () => {
    animation.value = withSpring(1);
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
};
