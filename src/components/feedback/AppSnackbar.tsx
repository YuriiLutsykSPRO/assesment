import Snackbar, { type SnackBarOptions } from "react-native-snackbar";

type AppSnackbarType = "success" | "error" | "info";

const getColor = (type: AppSnackbarType) => {
  switch (type) {
    case "success":
      return "#008000";
    case "error":
      return "#FF0000";
    case "info":
      return "#387ef5";
  }
};

type Props = {
  type: AppSnackbarType;
  text: string | undefined | string[];
} & Partial<SnackBarOptions>;

export const AppSnackbar = {
  show({ type, text, ...props }: Props) {
    const parsedText = Array.isArray(text) ? text.join("\n") : text;

    Snackbar.show({
      text: parsedText ?? "Something went wrong",
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: getColor(type),
      ...props,
    });
  },

  dismiss() {
    Snackbar.dismiss();
  },
};
