import { QueryClient } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected != null && state.isConnected);
  });
});

// TODO: Add default options if needed
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 3000,
      retry: 3,
    },
  },
});
