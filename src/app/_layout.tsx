import { Stack } from "expo-router";
import { queryClient } from "@/src/data";
import { useNotifyNetworkConnection } from "../hooks";
import { CartButton } from "../components";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { persister } from "../store/remote";

export default function RootLayout() {
  useNotifyNetworkConnection();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Stack
        screenOptions={{
          headerRight: () => <CartButton />,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Products",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="products/[id]"
          options={{
            title: "Product",
          }}
        />
        <Stack.Screen
          name="cart/index"
          options={{
            title: "Cart",
            headerRight: undefined,
          }}
        />
      </Stack>
    </PersistQueryClientProvider>
  );
}
