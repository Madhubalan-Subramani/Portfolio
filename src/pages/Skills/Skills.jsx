import Images from "../../utils/Images";
import { motion } from "framer-motion";
import SkillCard from "../../components/SkillCard";
import { useEffect, useState } from "react";

const skills = [
  { name: "HTML 5", logo: Images.SkillsImages.html_logo, percent: 90 },
  { name: "CSS 3", logo: Images.SkillsImages.css_logo, percent: 90 },
  { name: "JavaScript", logo: Images.SkillsImages.js_logo, percent: 90 },
  { name: "TypeScript", logo: Images.SkillsImages.ts_logo, percent: 75 },
  { name: "React.js", logo: Images.SkillsImages.react_logo, percent: 85 },
  { name: "Tailwind", logo: Images.SkillsImages.tailwind_logo, percent: 90 },
  { name: "Bootstrap", logo: Images.SkillsImages.bootstrap_logo, percent: 85 },
  { name: "Flutter", logo: Images.SkillsImages.flutter_logo, percent: 80 },
  { name: "Firebase", logo: Images.SkillsImages.firebase_logo, percent: 70 },
  { name: "Figma", logo: Images.SkillsImages.figma_logo, percent: 75 },
  { name: "MySQL", logo: Images.SkillsImages.mysql_logo, percent: 50 },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return (
    <div className="text-center text-white flex flex-col items-center justify-center min-h-screen pb-10">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-2xl md:text-3xl font-bold"
          >
            My <span className="text-[#8749f2]">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "10vh", opacity: 1 }}
            transition={{ duration: 3, delay: 0.2, ease: "easeOut" }}
            className="h-[3.5px] rounded bg-[#8749f2] mt-2"
          />
        </motion.div>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
            delay: 0.2,
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-5 md:mt-10 md:text-base text-start md:text-center text-sm"
        >
          Passionate about crafting seamless digital experiences with modern
          technologies. Constantly learning and evolving to build impactful web
          solutions.
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-5 mt-5 md:mt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            skill={skill}
            isActive={activeIndex === index}
            onActivate={() => setActiveIndex(index)}
            onDeactivate={() => setActiveIndex(null)}
            isTouchDevice={isTouchDevice}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
