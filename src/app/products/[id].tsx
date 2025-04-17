import { Stack } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AppImage,
  AppLoader,
  AppRefresh,
  RippleButton,
} from "@/src/components";
import { useProductScreen } from "@/src/hooks/screens/useProductScreen";

export default function ProductScreen() {
  const {
    isLoading,
    product,
    allColors,
    allSizes,
    isInCart,
    isOutOfStock,
    handleAddToCart,
    handleRemoveFromCart,
    selectedVariant,
    setSelectedVariant,
    isRefetching,
    onRefresh,
  } = useProductScreen();

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <AppLoader visible />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <AppRefresh refreshing={isRefetching} onRefresh={onRefresh} />
      }
    >
      <Stack.Screen
        options={{
          title: product.name,
        }}
      />

      <View style={styles.imageContainer}>
        <AppImage source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.productName}>{product.name}</Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.variantSection}>
          <Text style={styles.sectionTitle}>Color</Text>

          <View style={styles.colorOptions}>
            {allColors?.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  selectedVariant?.color === color && styles.selectedColor,
                ]}
                onPress={() =>
                  setSelectedVariant((prev) => {
                    if (!prev) return null;
                    return { ...prev, color };
                  })
                }
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.toLowerCase() },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeOptions}>
            {allSizes?.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedVariant?.size === size && styles.selectedSize,
                ]}
                onPress={() =>
                  setSelectedVariant((prev) => {
                    if (!prev) return null;
                    return { ...prev, size };
                  })
                }
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedVariant?.size === size && styles.selectedSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.stockInfo}>
          {selectedVariant && (
            <Text style={styles.stockText}>
              Stock:{" "}
              {product.variants.find(
                (v) =>
                  v.color === selectedVariant.color &&
                  v.size === selectedVariant.size
              )?.stock || 0}
            </Text>
          )}
        </View>

        {isInCart ? (
          <RippleButton onPress={handleRemoveFromCart}>
            <View style={[styles.button, styles.removeButton]}>
              <Text style={styles.buttonText}>Remove from Cart</Text>
            </View>
          </RippleButton>
        ) : (
          <RippleButton
            onPress={handleAddToCart}
            disabled={!selectedVariant || isOutOfStock}
          >
            <View
              style={[
                styles.button,
                styles.addButton,
                isOutOfStock && styles.disabledButton,
              ]}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </View>
          </RippleButton>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
    lineHeight: 24,
  },
  variantSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColor: {
    borderColor: "#3B82F6",
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  sizeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },
  selectedSize: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  sizeText: {
    fontSize: 14,
    color: "#374151",
  },
  selectedSizeText: {
    color: "white",
  },
  stockInfo: {
    marginBottom: 24,
  },
  stockText: {
    fontSize: 14,
    color: "#6B7280",
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  addButton: {
    backgroundColor: "#3B82F6",
  },
  removeButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
