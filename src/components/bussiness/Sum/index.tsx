import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppSnackbar, Tick } from "@/src/components";
import { useCart } from "@/src/hooks";

export const Sum = () => {
  const { totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    clearCart();
    AppSnackbar.show({
      type: "info",
      text: "Checkout",
    });
  };

  const totalPriceSplit = totalPrice.toFixed(2).toString().split("");

  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <View style={styles.row}>
          <Text style={styles.totalAmount}>$ </Text>
          {totalPriceSplit.map((item, index) => {
            const number = Number(item);

            if (Number.isNaN(number)) {
              return (
                <Text key={index} style={styles.totalAmount}>
                  {item}
                </Text>
              );
            }
            return (
              <Tick
                key={index}
                index={index}
                fontSize={18}
                value={number}
                textStyles={styles.totalAmount}
                duration={2000}
              />
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    alignItems: "center",
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
