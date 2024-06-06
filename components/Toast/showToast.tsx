// eslint-disable-next-line import/no-extraneous-dependencies
import { MessageType, showMessage } from "react-native-flash-message";
// message is the headline Warning or Error or Success
// The s=description should be success or error message or the content of your warning
// the type is fixed,  warning | success | danger | info
export const showToast = ({
  message,
  type = "default",
  autoHide = true,
  duration,
}: {
  message: string;
  type?: MessageType;
  autoHide?: boolean;
  duration?: number;
}) => {
  const defaultMessage = "An error occurred. Please try again.";
  const isMessageString = typeof message === "string";

  showMessage({
    message: "",
    duration: duration ?? 5000,
    description: isMessageString ? message : defaultMessage,
    type,
    autoHide,
  });
};
