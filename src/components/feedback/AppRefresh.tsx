import type { FC } from "react";
import { RefreshControl, type RefreshControlProps } from "react-native";

export const AppRefresh: FC<RefreshControlProps> = (props) => {
  // Add custom refresh control colors
  return <RefreshControl {...props} />;
};
