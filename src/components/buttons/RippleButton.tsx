import React from "react";

import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type RippleButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export const RippleButton = ({
  onPress,
  children,
  disabled,
}: RippleButtonProps) => {
  const rippleScale = useSharedValue(1);
  const rippleOpacity = useSharedValue(1);

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  const handlePressIn = () => {
    rippleScale.value = withSpring(0.8);
    rippleOpacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    rippleScale.value = withSpring(1);
    rippleOpacity.value = withSpring(1);
  };

  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.ripple, rippleStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
});
