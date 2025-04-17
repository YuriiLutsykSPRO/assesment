import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { Product } from "../../../mockBE";
import { Link } from "expo-router";
import Animated from "react-native-reanimated";
import { AppImage } from "../../AppImage";
import { enterAnimation, exitAnimation } from "@/src/config";
import { useScaleAnimation } from "./useScaleAnimation";

type ProductCardProps = {
  product: Product;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ProductCard = ({ product }: ProductCardProps) => {
  // We can add delay to the animation by index to make it more interesting
  // const delay = index > TAKE ? (index % TAKE) * DELAY : index * DELAY;

  const { animatedStyle, onPressIn, onPressOut } = useScaleAnimation();

  return (
    <Animated.View style={[animatedStyle, styles.productCard]}>
      <Link href={`/products/${product.id}`} asChild>
        <AnimatedPressable
          // Can be created as custom animation config
          entering={enterAnimation.duration(1000)}
          exiting={exitAnimation.duration(1000)}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <View style={styles.imageContainer}>
            <AppImage
              source={{ uri: product.image }}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={1}>
              {product.name}
            </Text>

            <Text style={styles.productDescription} numberOfLines={2}>
              {product.description}
            </Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>

              <Text style={styles.variants}>
                {product.variants.length} variants
              </Text>
            </View>
          </View>
        </AnimatedPressable>
      </Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  variants: {
    fontSize: 12,
    color: "#6B7280",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activePageButton: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageButtonText: {
    fontSize: 14,
    color: "#374151",
  },
  activePageButtonText: {
    color: "white",
  },
});
