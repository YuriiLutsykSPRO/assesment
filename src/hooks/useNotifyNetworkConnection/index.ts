import { useCallback } from "react";
import { useNetworkConnection } from "../useNetworkConnection";
import { AppSnackbar, INDEFINITE_SNSCKBAR } from "../../components/feedback";

export const useNotifyNetworkConnection = () => {
  const onConnected = useCallback(() => {
    AppSnackbar.show({
      text: "Connected to the network",
      type: "success",
    });
  }, []);

  const onDisconnected = useCallback(() => {
    AppSnackbar.show({
      text: "Disconnected from the network",
      type: "error",
      duration: INDEFINITE_SNSCKBAR,
    });
  }, []);

  useNetworkConnection({
    onConnected,
    onDisconnected,
  });
};
