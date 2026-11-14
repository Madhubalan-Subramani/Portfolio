import Images from "../../utils/Images";
import { motion } from "framer-motion";
import SkillCard from "../../components/SkillCard";
import { useEffect, useState } from "react";

const skills = [
  { name: "HTML 5", logo: Images.SkillsImages.html_logo, percent: 95 },
  { name: "CSS 3", logo: Images.SkillsImages.css_logo, percent: 95 },
  { name: "JavaScript", logo: Images.SkillsImages.js_logo, percent: 95 },
  { name: "TypeScript", logo: Images.SkillsImages.ts_logo, percent: 75 },
  { name: "React.js", logo: Images.SkillsImages.react_logo, percent: 85 },
  { name: "Node.js", logo: Images.SkillsImages.node_logo, percent: 80 },
  { name: "Python", logo: Images.SkillsImages.python_logo, percent: 75 },
  { name: "Tailwind", logo: Images.SkillsImages.tailwind_logo, percent: 90 },
  { name: "Bootstrap", logo: Images.SkillsImages.bootstrap_logo, percent: 85 },
  { name: "Flutter", logo: Images.SkillsImages.flutter_logo, percent: 60 },
  { name: "Firebase", logo: Images.SkillsImages.firebase_logo, percent: 70 },
  { name: "MySQL", logo: Images.SkillsImages.mysql_logo, percent: 70 },
  { name: "Figma", logo: Images.SkillsImages.figma_logo, percent: 50 },
  { name: "GitHub", logo: Images.SkillsImages.github_logo, percent: 85 },
];

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches
      : false
  );
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleSkills =
    isMobile && !showAllMobile ? skills.slice(0, 6) : skills;

  return (
    <div className="text-center text-white flex flex-col items-center justify-start md:justify-center py-8 md:py-0 md:min-h-screen">
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

      <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap md:justify-center gap-2.5 sm:gap-4 md:gap-5 mt-5 md:mt-10 justify-items-center w-full max-w-4xl mx-auto">
        {visibleSkills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            idx={index}
            isNewlyExpanded={isMobile && showAllMobile && index >= 6}
            isActive={activeIndex === index}
            onActivate={() => setActiveIndex(index)}
            onDeactivate={() => setActiveIndex(null)}
            isTouchDevice={isTouchDevice}
          />
        ))}
      </div>

      {/* Mobile-only Show More / Show Less after 2 rows (6 cards) */}
      {isMobile && skills.length > 6 && (
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setShowAllMobile((prev) => !prev)}
            className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#252525] text-[#8749f2] hover:text-white border border-[#8749f2]/60 hover:border-[#8749f2] px-5 py-2 rounded-full text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>
              {showAllMobile
                ? "Show Less"
                : `Show More (${skills.length - 6} more)`}
            </span>
            <svg
              className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                showAllMobile ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Skills;
