import Toast from "react-native-root-toast";

export const showToast = (message) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
  });
}
