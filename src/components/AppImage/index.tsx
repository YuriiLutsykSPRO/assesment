import React, { type FC } from "react";
import { View } from "react-native";

import { Image, type ImageProps } from "expo-image";

export const AppImage: FC<ImageProps> = ({ source, ...props }) => {
  return (
    <View>
      {source ? (
        <Image
          placeholder={require("../../../assets/images/loading.jpeg")}
          source={source}
          cachePolicy={"disk"}
          placeholderContentFit="fill"
          {...props}
        />
      ) : null}
    </View>
  );
};
