import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppImage } from "../../AppImage";
import { useCart } from "@/src/hooks";
import { useEffect, useRef, useMemo } from "react";
import { Tick } from "../Tick";

const fontSize = 14;

export const CartButton = () => {
  const { totalQuantity } = useCart();
  const initRenderRef = useRef(true);
  const addPlus = totalQuantity > 9;

  useEffect(() => {
    initRenderRef.current = false;
  }, []);

  return (
    <Link href="/cart" asChild>
      <TouchableOpacity>
        <View style={styles.container}>
          <AppImage
            source={require("../../../../assets/images/cart.png")}
            style={styles.image}
          />

          <View style={styles.tickContainer}>
            <Tick value={totalQuantity} index={0} fontSize={fontSize} />
            {addPlus && <Text style={styles.plus}>+</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    overflow: "hidden",
  },
  tickContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
  plus: {
    paddingTop: fontSize / 5,
  },
});
