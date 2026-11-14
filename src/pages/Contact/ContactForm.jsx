import { useState } from "react";
import CommonButton from "../../components/Buttons/CommonButton";
import { InputField, TextareaField } from "../../components/InputField";
import { motion } from "framer-motion";
import FormSubmit from "./FormSubmit";

// Defined outside component so objects aren't re-created on every render
// Butter-smooth vertical float cascade for the contact form
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    await FormSubmit(e);
    setIsLoading(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.h2
        className="text-xl md:text-2xl font-semibold text-white mb-6 text-center"
        variants={itemVariants}
      >
        Let's Collaborate
      </motion.h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-gray-800"
      >
        <motion.div className="flex flex-col md:flex-row gap-4" variants={itemVariants}>
          <InputField name="firstName" placeholder="Your First Name" required />
          <InputField name="lastName" placeholder="Your Last Name" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <InputField type="email" name="email" placeholder="Your Email" required />
        </motion.div>

        <motion.div variants={itemVariants}>
          <InputField type="tel" name="phone" placeholder="Your Phone Number" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextareaField name="message" placeholder="Your Message" required />
        </motion.div>

        <motion.div className="flex justify-center pt-4" variants={itemVariants}>
          <CommonButton
            name={isLoading ? "Sending..." : "Send Message"}
            type="submit"
          />
        </motion.div>
      </form>
    </motion.div>
  );
}
