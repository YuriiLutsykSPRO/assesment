import {
  runOnJS,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useShakeAnimation(shouldShake: boolean, onFinish: () => void) {
  return useAnimatedStyle(
    () => ({
      transform: shouldShake
        ? [
            {
              translateX: withSequence(
                withTiming(-9, { duration: 50 }),
                withTiming(9, { duration: 50 }),
                withTiming(-6, { duration: 50 }),
                withTiming(6, { duration: 50 }),
                withTiming(-3, { duration: 50 }),
                withTiming(3, { duration: 50 }),
                withTiming(0, { duration: 50 }, (isFinished) => {
                  if (isFinished) {
                    runOnJS(onFinish)();
                  }
                })
              ),
            },
          ]
        : [],
    }),
    [shouldShake, onFinish]
  );
}
