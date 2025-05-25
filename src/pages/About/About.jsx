import CommonIconButton from "../../components/Buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Images from "../../utils/Images";
import { resumeDownload } from "../../components/Buttons/ResumeDownload";


const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 w-full text-white py-10 overflow-hidden px-1 md:px-2 min-h-[90vh]">
      <motion.div
        className="w-full md:w-2/5 flex justify-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2.3, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <img
          src={Images.UserImages.about_Image}
          alt="Madhu Balan"
          className="w-48 h-48 md:w-full md:h-auto object-contain"
        />
      </motion.div>

      <div className="w-full lg:w-3/5 flex flex-col gap-6">
        <div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.7 }}
            className="text-[#8749f2] text-sm md:text-lg font-semibold"
          >
            Discover
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.7 }}
            className="relative text-2xl md:text-3xl font-bold mt-1"
          >
            About Me
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "12%", opacity: 1 }}
              transition={{ duration: 3, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-[-6px] left-0 h-[3px] rounded bg-[#8749f2]"
            />
          </motion.div>
        </div>

        <motion.div
          className="text-base text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4, delay: 0.5 }}
          viewport={{ once: false, amount: 0.9 }}
        >
          <p>
            I am Madhubalan, a web developer skilled in React. I focus on
            building user-friendly applications with clean, efficient code. I
            enjoy solving problems, learning new technologies, and working with
            teams to create great user experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-[#8749f2] p-4 md:p-6 rounded-lg text-sm md:text-md shadow-xl bg-gradient-to-br from-[#1f1f1f] to-black"
          initial={{ opacity: 0, rotateY: -45, scale: 0.8 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            type: "spring",
            stiffness: 60,
          }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {[
              "Name: Madhubalan Subramani",
              "Phone: +91 8946059125",
              "Email: stmmadhubalan@gmail.com",
              "Location: Salem, TamilNadu",
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <span className="font-bold text-gray-200">
                  {text.split(":")[0]}:&nbsp;
                </span>
                {text.split(":")[1]}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                  delayChildren: 0.5,
                },
              },
            }}
            viewport={{ once: false, amount: 0.5 }}
          >
            {[
              "Experience: 3 Years",
              "Skills: React Js, JS, HTML 5, CSS, Tailwind & Flutter",
              "Current Job: Swithin & Sherwin Pvt Ltd",
              "Education: BE - Mechanical Engineering",
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <span className="font-bold text-gray-200">
                  {text.split(":")[0]}:&nbsp;
                </span>
                {text.split(":")[1]}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.9 }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
          }}
        >
          <CommonIconButton
            icon={<FontAwesomeIcon icon={faFile} />}
            name={"Download CV"}
            onClick={resumeDownload}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
