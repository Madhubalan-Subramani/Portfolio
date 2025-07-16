import CommonButton from "../../components/Buttons/CommonButton";
import { InputField, TextareaField } from "../../components/InputField";
import { motion } from "framer-motion";
import FormSubmit from "./FormSubmit";

export default function ContactForm() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 10,
      },
    },
  };

  return (
    <>
      <motion.h2
        className="text-xl md:text-2xl font-semibold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        Let’s Collaborate
      </motion.h2>

      <motion.form
        onSubmit={FormSubmit}
        className="space-y-4 text-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          variants={itemVariants}
        >
          <InputField name="firstName" placeholder="Your First Name" required />
          <InputField name="lastName" placeholder="Your Last Name" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <InputField type="email" name="email" placeholder="Your Email" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <InputField type="tel" name="phone" placeholder="Your Phone Number" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextareaField name="message" placeholder="Your Message" />
        </motion.div>

        <motion.div
          className="flex justify-center pt-4"
          variants={itemVariants}
        >
          <CommonButton name="Send Message" type="submit" />
        </motion.div>
      </motion.form>
    </>
  );
}
