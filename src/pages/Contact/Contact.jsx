import Images from "../../utils/Images";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import { motion } from "framer-motion";

// Left card: Silky converging glide from the left (GPU transform & opacity only - 0 lag)
const leftCardVariants = {
  hidden: { opacity: 0, x: -45, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Right card: Silky converging glide from the right with slight offset
const rightCardVariants = {
  hidden: { opacity: 0, x: 45, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.12,
    },
  },
};

const Contact = () => {
  return (
    <div className="overflow-hidden">
      <div
        className="text-center text-white flex flex-col lg:items-center justify-end min-h-screen"
        style={{
          backgroundImage: `url(${Images.OtherImages.contact_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 lg:gap-10 px-4 sm:px-8 md:px-5 py-10 w-full max-w-6xl mx-auto">
          {/* Contact Details card - glides from left */}
          <motion.div
            className="w-full md:w-[45%] lg:w-[42%] bg-black/50 backdrop-blur-md p-5 md:p-8 rounded-lg border border-white/10 shadow-lg"
            variants={leftCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <ContactDetails />
          </motion.div>

          {/* Contact Form card - glides from right */}
          <motion.div
            className="w-full md:w-[50%] lg:w-[48%] bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-lg border border-white/10 shadow-lg"
            variants={rightCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <ContactForm />
          </motion.div>
        </div>

        <footer className="h-[50px] text-center flex items-center justify-center text-xs md:text-sm bg-black text-white w-full px-3">
          © {new Date().getFullYear()} All Rights Reserved. Designed by Madhubalan
        </footer>
      </div>
    </div>
  );
};

export default Contact;
