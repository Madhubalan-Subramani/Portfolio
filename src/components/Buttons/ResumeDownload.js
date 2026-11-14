import { toast } from "react-toastify";

export const resumeDownload = () => {
  const link = document.createElement("a");
  link.href = `${import.meta.env.BASE_URL}Madhu_Resume.pdf`;
  link.download = "Madhu_Resume.pdf";
  link.click();
  toast.success("Resume downloaded successfully!", {
    position: "bottom-right",
  });
};
