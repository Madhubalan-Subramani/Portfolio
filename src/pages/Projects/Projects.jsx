import Images from "../../utils/Images";
import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";

const projectData = [
  {
    image: Images.ProjectImages.farmtracker_project,
    type: "Web Application",
    description:
      "Farm Tracker helps farmers track and manage their farm activities efficiently with real-time insights, making it easy to record, view, and filter past cultivation work.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.tailwind_logo,
      Images.SkillsImages.firebase_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: "https://github.com/Madhubalan-Subramani/Farm-Tracker",
  },
  {
    image: Images.ProjectImages.docengage_project,
    type: "Web Application",
    description:
      "Implemented UI/UX designs for seven different modules in DocEngage, ensuring user-friendly and added new functionality.",
    tech: [
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.bootstrap_logo,
      Images.SkillsImages.mysql_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: "https://www.docengage.in/",
  },
  {
    image: Images.ProjectImages.sherwin_project,
    type: "Cross Platform Application",
    description:
      "Designed and implemented UI/UX layouts screens for the Sherwin e-commerce app, including a new customization feature for personalized shopping.",
    tech: [
      Images.SkillsImages.flutter_logo,
      Images.SkillsImages.dart_logo,
      Images.SoftwareImages.android_studio_logo,
    ],
    link: null,
  },
  {
    image: Images.ProjectImages.login_project,
    type: "Mobile Application",
    description:
      "Developed a login application with authentication, ensuring secure user access and seamless experience.",
    tech: [
      Images.SkillsImages.flutter_logo,
      Images.SkillsImages.dart_logo,
      Images.SkillsImages.firebase_logo,
      Images.SoftwareImages.android_studio_logo,
    ],
    link: "https://github.com/Madhubalan-Subramani/Flutter-Login-Appliction",
  },
  {
    image: Images.ProjectImages.calculator_project,
    type: "Mobile Application",
    description:
      "Designed and developed a visually appealing and fully responsive basic calculator application, ensuring smooth and efficient functionality across all devices.",
    tech: [
      Images.SkillsImages.flutter_logo,
      Images.SkillsImages.dart_logo,
      Images.SoftwareImages.android_studio_logo,
    ],
    link: "https://github.com/Madhubalan-Subramani/Calculator",
  },
];

const Projects = () => {
  return (
    <div className="text-center text-white flex flex-col items-center justify-center min-h-screen py-8">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-2xl md:text-3xl font-bold"
          >
            <span className="text-[#8749f2]">Pro</span>ject
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "10vh", opacity: 1 }}
            transition={{ duration: 4, delay: 0.2, ease: "easeOut" }}
            className="h-[3.5px] rounded bg-[#8749f2] mt-2 mx-auto origin-left"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-5 md:mt-6 md:text-base text-center text-sm"
        >
          Bringing ideas to life through design and development. Explore my
          projects !
        </motion.p>
      </div>

      <div className="flex flex-wrap flex-row gap-4 lg:gap-8 justify-center items-center mt-5 md:mt-10 mb-5">
        {projectData.map((project, idx) => (
          <ProjectCard project={project} id={idx} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
