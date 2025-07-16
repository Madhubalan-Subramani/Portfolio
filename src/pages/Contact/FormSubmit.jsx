import axios from "axios";
import { toast } from "react-toastify";

const FormSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  try {
    const response = await axios.post("https://formspree.io/f/xyzpybrd", data, {
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      toast.success("Thank you! Your message has been sent.");
      form.reset();
    } else {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error sending your message. Please try again later.");
  }
};

export default FormSubmit;
