import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AppList, AppSnackbar, ProductCard } from "../components";
import { useGetProducts } from "../store/remote";

export default function ProductsScreen() {
  const {
    data,
    isLoading,
    isFetching,
    error,
    onLoadMore,
    onRefresh,
    isRefetching,
  } = useGetProducts();

  useEffect(() => {
    if (error) {
      AppSnackbar.show({
        text: error?.message,
        type: "error",
      });
    }
  }, [error]);

  if (isLoading && !data?.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>No products found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Products</Text>

      <AppList
        estimatedItemSize={344}
        columnWrapperStyle={styles.productsGrid}
        data={data}
        onLoadNextPage={onLoadMore}
        nextPageLoading={isFetching}
        refreshing={isRefetching && !isLoading}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productsGrid: { columnGap: 12 },
});
