import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { usePrevious } from "../usePrevious";

type Props = {
  onConnected: () => void;
  onDisconnected: () => void;
};

export const useNetworkConnection = ({
  onConnected,
  onDisconnected,
}: Props) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  // In order to avoid calling the callback on the rerenders
  const previousIsConnected = usePrevious(isConnected);

  useEffect(() => {
    // Check initial connection state
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isInternetReachable ?? true);
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable ?? true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      previousIsConnected === isConnected ||
      previousIsConnected === undefined
    ) {
      return;
    }

    if (isConnected) {
      onConnected();
    } else {
      onDisconnected();
    }
  }, [isConnected, onConnected, onDisconnected, previousIsConnected]);
};
