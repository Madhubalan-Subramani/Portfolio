import Images from "../../utils/Images";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: 45,
    filter: "blur(10px)",
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 2,
    },
  },
};

const Contact = () => {
  return (
    <div className="">
      <div
        className="text-center text-white flex flex-col lg:items-center justify-end  min-h-screen"
        style={{
          backgroundImage: `url(${Images.OtherImages.contact_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 lg:gap-10 px-[10vw] md:px-5 py-10">
          <motion.div
            className="w-full md:w-[45%] lg:w-[40%] bg-black/40 backdrop-blur-xl p-5 md:p-8 rounded-md border border-white/10 shadow-lg"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <ContactDetails />
          </motion.div>

          <motion.div
            className="w-full md:w-[50%] bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-md border border-white/10 shadow-lg"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.05 }}
            transition={{ delay: 0.3 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <ContactForm />
          </motion.div>
        </div>
        <footer className="h-[50px] text-center flex items-center justify-center text-xs md:text-sm bg-black text-white w-full px-3">
        © {new Date().getFullYear()} All Rights Reserved. Designed by
        Madhubalan
      </footer>
      </div>
      
    </div>
  );
};

export default Contact;
