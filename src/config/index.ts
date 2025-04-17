import { FadeIn, SlideOutUp } from "react-native-reanimated";

export const enterAnimation = FadeIn.springify().damping(80).stiffness(200);

export const exitAnimation = SlideOutUp.springify().damping(80).stiffness(200);
