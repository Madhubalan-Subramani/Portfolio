import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationArrow,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import SocialIcon from "../../components/Buttons/SocialIcon";
import { motion } from "framer-motion";

const ContactItem = ({ icon, children, link }) => {
  const content = (
    <div className="flex items-center gap-3 text-white bg-white/10 p-3 rounded-sm hover:bg-white/20 hover:scale-[1.01] transition-transform duration-200 overflow-x-auto">
      <FontAwesomeIcon icon={icon} />
      <p className="text-xs md:text-sm mb-0">{children}</p>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

const socialLinks = [
  { icon: faLinkedin, url: "https://www.linkedin.com/in/stmmadhubalan" },
  { icon: faGithub, url: "https://github.com/Madhubalan-Subramani" },
  { icon: faInstagram, url: "https://www.instagram.com/_n_o_b_it_a_/" },
];

// Social icons smooth scale & lift
const SocialIconList = () => (
  <div className="mt-4 flex justify-center gap-4 text-white text-xl">
    {socialLinks.map(({ icon, url }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.7, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.35 + i * 0.1,
        }}
        style={{ cursor: "pointer" }}
        onClick={() => window.open(url, "_blank")}
      >
        <SocialIcon icon={<FontAwesomeIcon icon={icon} />} />
      </motion.div>
    ))}
  </div>
);

// Butter-smooth horizontal cascade for details
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ContactDetails() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="text-white max-w-md mx-auto"
    >
      <motion.h2
        variants={itemVariants}
        className="text-xl md:text-2xl font-semibold mb-6"
      >
        Get in Touch
      </motion.h2>

      <motion.p variants={itemVariants} className="text-sm mb-8 text-gray-300">
        Got a project or an idea in mind ? Let's talk ! I'm here to bring your
        vision to life.
      </motion.p>

      <motion.div variants={containerVariants} className="flex flex-col gap-4 mb-6">
        <motion.div variants={itemVariants}>
          <ContactItem
            icon={faEnvelope}
            link="https://mail.google.com/mail/?view=cm&fs=1&to=stmmadhubalan@gmail.com&su=Your%20Subject&body=Message%20goes%20here"
          >
            stmmadhubalan@gmail.com
          </ContactItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ContactItem icon={faPhone} link="tel:+918946059125">
            +91 8946059125
          </ContactItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ContactItem icon={faLocationArrow}>Bengaluru, India</ContactItem>
        </motion.div>
      </motion.div>

      <SocialIconList />
    </motion.div>
  );
}
