import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import type { CartItem as CartItemType } from "@/src/store";
import { useCart, useShakeAnimation } from "@/src/hooks";
import Animated from "react-native-reanimated";
import { memo, useCallback } from "react";
import { enterAnimation, exitAnimation } from "@/src/config";

type CartItemProps = {
  item: CartItemType;
  index: number;
};

const CartItemBase = ({ item, index }: CartItemProps) => {
  const { updateQuantity, removeItem, isOutOfStock, setIsOutOfStock } =
    useCart();

  const onShakeFinish = useCallback(() => {
    setIsOutOfStock(false);
  }, [setIsOutOfStock]);

  const delay = index * 200;

  const animatedStyle = useShakeAnimation(isOutOfStock, onShakeFinish);

  return (
    <Animated.View
      style={styles.cartItem}
      entering={enterAnimation.duration(1000).delay(delay)}
      exiting={exitAnimation.duration(10000)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.variantText}>
          {item.color} - {item.size}
        </Text>
        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <Animated.View style={animatedStyle}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          removeItem(item.id);
        }}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const CartItem = memo(CartItemBase);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  variantText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 4,
    alignSelf: "flex-start",
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 6,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  removeButtonText: {
    fontSize: 18,
    color: "#6B7280",
    fontWeight: "600",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  checkoutButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
