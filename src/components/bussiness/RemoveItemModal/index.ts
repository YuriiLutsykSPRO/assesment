import { Alert } from "react-native";

// TODO: Generic modal

type Props = {
  onCancelPress: () => void;
  onConfirmPress: () => void;
};
export const removeItemModal = ({ onCancelPress, onConfirmPress }: Props) => {
  Alert.alert("Do you want to remove this item from the cart?", "", [
    {
      text: "Cancel",
      style: "cancel",
      onPress: onCancelPress,
    },
    {
      text: "Remove",
      style: "destructive",
      onPress: onConfirmPress,
    },
  ]);
};
