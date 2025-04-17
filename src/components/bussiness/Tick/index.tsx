import { memo, useEffect, useState } from "react";
import { type StyleProp, Text, type TextStyle, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const tickNumbers: number[] = new Array(9).fill(0).map((_, index) => index + 1);

type TickProps = {
  value: number;
  textStyles?: StyleProp<TextStyle>;
  fontSize?: number;
  index: number;
  duration?: number;
};

const TickBase = ({
  value,
  textStyles,
  fontSize = 14,
  index,
  duration = 1000,
}: TickProps) => {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100;

    if (value > 9) {
      sharedValue.value = withSpring(9, {}, (isFinished) => {
        if (isFinished) {
          sharedValue.value = withSpring(8);
        }
      });
      return;
    }

    sharedValue.value = withDelay(
      delay,
      withSpring(value - 1, {
        duration,
      })
    );
  }, [value, index, duration]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -fontSize * 1.1 * sharedValue.value,
        },
      ],
    };
  });

  return (
    <View
      style={{
        height: fontSize,
        overflow: "hidden",
      }}
    >
      <Animated.View style={animatedStyles}>
        {tickNumbers.map((number, index) => (
          <Text
            key={index}
            style={[
              {
                fontSize,
                lineHeight: fontSize * 1.1,
                fontVariant: ["tabular-nums"],
              },
              textStyles,
            ]}
          >
            {number}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

export const Tick = memo(TickBase);
