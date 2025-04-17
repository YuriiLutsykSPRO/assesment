import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { zustandStorage } from "../local/storage";

const syncStorage = {
  getItem: (key: string) => {
    const value = zustandStorage.getItem(key);
    return value instanceof Promise ? null : value;
  },
  setItem: (key: string, value: string) => {
    zustandStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    zustandStorage.removeItem(key);
  },
};

export const queryClient = new QueryClient();

export const persister = createSyncStoragePersister({
  storage: syncStorage,
  throttleTime: 3000,
});
