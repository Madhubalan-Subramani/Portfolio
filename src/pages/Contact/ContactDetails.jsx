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
  return (
    <div className="flex items-center gap-3 text-white bg-white/10 p-3 rounded-sm hover:bg-white/20 hover:scale-[1.01] transition-transform duration-200 overflow-x-auto">
      <FontAwesomeIcon icon={icon} />
      {link ? (
        <a
          href={link}
          className="text-xs md:text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <p className="text-xs md:text-sm mb-0">{children}</p>
      )}
    </div>
  );
};

const socialLinks = [
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/stmmadhubalan",
  },
  {
    icon: faGithub,
    url: "https://github.com/Madhubalan-Subramani",
  },
  {
    icon: faInstagram,
    url: "https://www.instagram.com/_n_o_b_it_a_/",
  },
];

const SocialIconList = () => (
  <div className="mt-4 flex justify-center gap-4 text-white text-xl">
    {socialLinks.map(({ icon, url }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: i * 0.3,
        }}
        style={{ cursor: "pointer" }}
        onClick={() => window.open(url, "_blank")}
      >
        <SocialIcon icon={<FontAwesomeIcon icon={icon} />} />
      </motion.div>
    ))}
  </div>
);

export default function ContactDetails() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 10,
        damping: 5,
        mass: 3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="text-white max-w-md mx-auto"
    >
      <motion.h2
        variants={itemVariants}
        className="text-xl md:text-2xl font-semibold mb-6"
      >
        Get in Touch
      </motion.h2>

      <motion.p variants={itemVariants} className="text-sm mb-8">
        Got a project or an idea in mind ? Let’s talk ! I’m here to bring
        your vision to life.
      </motion.p>

      <motion.div
        variants={containerVariants}
        className="flex flex-col gap-5 mb-6"
      >
        <motion.div variants={itemVariants}>
          <ContactItem
            icon={faEnvelope}
            link="https://mail.google.com/mail/?view=cm&fs=1&to=stmmadhubalan@gmail.com&su=Your%20Subject&body=Message%20goes%20here"
            inline
          >
            stmmadhubalan@gmail.com
          </ContactItem>
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactItem icon={faPhone} inline>
            +91 8946059125
          </ContactItem>
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactItem icon={faLocationArrow} inline>
            Salem, Tamil Nadu
          </ContactItem>
        </motion.div>
      </motion.div>

      <SocialIconList />
    </motion.div>
  );
}
