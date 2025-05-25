import CommonButton from "../../components/Buttons/CommonButton";
import Images from "../../utils/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faFile, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import CommonIconButton from "../../components/Buttons/IconButton";
import SocialIcon from "../../components/Buttons/SocialIcon";
import { motion } from "framer-motion";
import { resumeDownload } from "../../components/Buttons/ResumeDownload";

const Home = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row py-10 bg-black text-white min-h-[90vh] gap-5 overflow-hidden">
      <div className="w-full px-2 lg:w-1/2 flex flex-col justify-center text-center items-center lg:items-start mb-10 lg:mb-0">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium mb-[-10px]"
        >
          <p>Hello I'm</p>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#8749f2] my-3 md:my-5"
        >
          Madhubalan
        </motion.div>

        <motion.div
          className="mb-6 text-sm md:text-base lg:text-md lg:text-start max-w-full md:max-w-lg w-full"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p>
            Frontend developer with 3 years of experience crafting sleek,
            high-impact web apps. Expert in React and modern UI, with a passion
            for clean design and seamless UX.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4 justify-center lg:justify-start items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.9 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
        >
          <CommonButton name={"Hire Me"} />
          <CommonIconButton
            name={"Download CV"}
            icon={<FontAwesomeIcon icon={faFile} />}
            onClick={resumeDownload}
          />
        </motion.div>

        <motion.div className="flex gap-6 mt-8 justify-center lg:justify-start">
          {[faEnvelope, faLinkedin, faGithub, faInstagram].map((icon, i) => (
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
            >
              <SocialIcon
                icon={<FontAwesomeIcon icon={icon} />}
                onclick={() => {
                  const links = [
                    "https://mail.google.com/mail/?view=cm&fs=1&to=stmmadhubalan@gmail.com&su=Your%20Subject&body=Message%20goes%20here",
                    "https://www.linkedin.com/in/stmmadhubalan",
                    "https://github.com/Madhubalan-Subramani",
                    "https://www.instagram.com/_n_o_b_it_a_/",
                  ];

                  const link = links[i];
                  window.open(link, "_blank");
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={Images.UserImages.home_Image}
          alt="User"
          className="w-[80%] md:w-[70%] lg:w-full h-auto object-contain max-h-[85vh]"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default Home;
