import { useState, useEffect } from "react";
import Images from "../../utils/Images";
import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";

const projectData = [
  // 1. Neumeric - BEL Traceability
  {
    title: "BEL Traceability",
    image: Images.ProjectImages.Bel_project,
    type: "Web Application",
    description:
      "Engineered real-time EVM machine-handshake workflows, 25+ schema-validated forms (React Hook Form, Yup), and centralized Redux state management for high-volume tracking.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.tailwind_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SkillsImages.mysql_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: null,
  },
  // 2. Neumeric - CryptoTrace
  {
    title: "CryptoTrace",
    image: Images.ProjectImages.Bel_project,
    type: "Web Application",
    description:
      "Architected blockchain forensics front-end system with interactive Cytoscape.js graphs, multi-network address lookups, directional filtering, and UTXO transaction lineage.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.ts_logo,
      Images.SkillsImages.tailwind_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: null,
  },
  // 3. Neumeric - Smart City ITMS
  {
    title: "Smart City ITMS",
    image: Images.ProjectImages.Bel_project,
    type: "Web Application",
    description:
      "Spearheaded traffic violation & GIS analytics platform across 50+ REST endpoints with RS256 JWT/RBAC guards, Server-Sent Events (SSE) telemetry, and virtualized data grids.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.ts_logo,
      Images.SkillsImages.tailwind_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: null,
  },
  // 4. Swithin & Sherwin
  {
    title: "Sherwin Custom Apparel",
    image: Images.ProjectImages.sherwin_project,
    type: "Web Application",
    description:
      "Designed and built 30+ responsive React.js storefront views featuring an interactive real-time clothing personalization studio backed by Redux state management.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.tailwind_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: null,
  },
  // 5. DocEngage
  {
    title: "DocEngage Healthcare",
    image: Images.ProjectImages.docengage_project,
    type: "Web Application",
    description:
      "Overhauled UI across 7 core healthcare modules, delivering reusable component libraries, search, filtering, and pagination workflows for over 1,000 active users.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.bootstrap_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SkillsImages.mysql_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: "https://www.docengage.in/",
  },
  // 6. Personal - Farm Tracker
  {
    title: "Farm Tracker",
    image: Images.ProjectImages.farmtracker_project,
    type: "Web Application",
    description:
      "Helps farmers track and manage cultivation activities with real-time insights, activity logging, filtering past farm records, and Firebase cloud persistence.",
    tech: [
      Images.SkillsImages.react_logo,
      Images.SkillsImages.firebase_logo,
      Images.SkillsImages.tailwind_logo,
      Images.SkillsImages.js_logo,
      Images.SkillsImages.html_logo,
      Images.SkillsImages.css_logo,
      Images.SoftwareImages.vsCode_logo,
    ],
    link: "https://github.com/Madhubalan-Subramani/Farm-Tracker",
  },
  // 7. Personal - Login Application
  {
    title: "Flutter Login App",
    image: Images.ProjectImages.login_project,
    type: "Mobile Application",
    description:
      "Developed a cross-platform mobile login application with Firebase authentication, ensuring secure user access, clean validation, and seamless UX across devices.",
    tech: [
      Images.SkillsImages.flutter_logo,
      Images.SkillsImages.dart_logo,
      Images.SkillsImages.firebase_logo,
      Images.SoftwareImages.android_studio_logo,
    ],
    link: "https://github.com/Madhubalan-Subramani/Flutter-Login-Appliction",
  },
];

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedProjects =
    isMobile && !showAllMobile ? projectData.slice(0, 4) : projectData;

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
            <span className="text-[#8749f2]">Pro</span>jects
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

      {/* Responsive grid: 4 in a row on desktop (lg:grid-cols-4), 2 in a row on mobile (grid-cols-2) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full max-w-7xl mx-auto mt-6 md:mt-10">
        {displayedProjects.map((project, idx) => (
          <ProjectCard project={project} idx={idx} key={project.title} />
        ))}
      </div>

      {/* Mobile-only Show More / Show Less Button */}
      {isMobile && projectData.length > 4 && (
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
            {showAllMobile
              ? "Show Less"
              : `Show More (${projectData.length - 4} more)`}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
