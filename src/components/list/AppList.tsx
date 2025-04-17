import { forwardRef } from "react";
import { StyleSheet, View } from "react-native";

import { LegendList, type LegendListProps } from "@legendapp/list";

import { AppLoader, AppRefresh } from "../feedback";

interface Props<T extends object>
  extends Omit<
    LegendListProps<T>,
    "onEndReached" | "refreshControl" | "showsVerticalScrollIndicator"
  > {
  withFooter?: boolean;
  nextPageLoading?: boolean;
  onLoadNextPage?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

// TODO : fix type definition for forwardRef
export const AppList = forwardRef<any, Props<any>>(
  <T extends object>(props: Props<T>, ref: any) => {
    const {
      withFooter = true,
      nextPageLoading,
      onLoadNextPage,
      data,
      refreshing,
      onRefresh,
      ...rest
    } = props;

    return (
      <LegendList<T>
        ref={ref}
        data={data}
        // Check last list of items
        // recycleItems
        ListFooterComponent={
          withFooter ? (
            <View style={styles.footer}>
              <AppLoader visible={Boolean(nextPageLoading)} />
            </View>
          ) : undefined
        }
        {...rest}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <AppRefresh refreshing={!!refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        onEndReached={data && data.length > 0 ? onLoadNextPage : undefined}
      />
    );
  }
);

const styles = StyleSheet.create({
  footer: {
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
