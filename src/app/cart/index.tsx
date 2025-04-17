import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AppList, CartItem, Sum } from "@/src/components";
import { useCart } from "@/src/hooks";

export default function CartScreen() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppList
        data={items}
        estimatedItemSize={152}
        renderItem={({ item, index }) => <CartItem item={item} index={index} />}
      />

      <Sum />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  emptyText: {
    fontSize: 18,
    color: "#6B7280",
  },
});
