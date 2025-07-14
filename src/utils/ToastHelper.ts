import { toast } from "react-toastify";

export const showError = (message = "Something went wrong. Please try again.") => {
  toast.error(message, {
    position: "bottom-center",
  });
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
  });
};
