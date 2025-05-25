export const resumeDownload = () => {
  const link = document.createElement("a");
  link.href = "Madhu_Resume.pdf";
  link.download = "Madhu_Resume.pdf";
  link.click();
};
