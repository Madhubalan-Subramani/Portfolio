import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.94,
  },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      delay: (idx % 4) * 0.16,
    },
  }),
};

const ProjectCard = ({ project, idx }) => {
  return (
    <motion.div
      custom={idx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      whileHover={{
        scale: 1.04,
        y: -5,
        boxShadow: "0 10px 25px -3px rgba(135, 73, 242, 0.5)",
        borderColor: "#8749f2",
        transition: { duration: 0.18, ease: "easeOut" },
      }}
      className="relative rounded-lg p-3 sm:p-4 bg-[#1b1b1b] flex flex-col justify-between w-full min-h-[360px] sm:min-h-[390px] border border-[#2f2f2f] hover:border-[#8749f2] transition-colors duration-200"
      style={{ willChange: "transform, box-shadow" }}
    >
      <div>
        {/* Project Image with small floating type badge */}
        <div className="relative rounded-md overflow-hidden w-full h-24 sm:h-28 md:h-32 bg-black/60 border border-white/5 flex items-center justify-center group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain p-1.5 transition-transform duration-200 group-hover:scale-105"
          />
          {/* Small badge tucked in top-right of the image */}
          <span className="absolute top-1.5 right-1.5 text-[9px] font-medium text-violet-300 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm border border-violet-500/30 rounded">
            {project.type === "Mobile Application" ? "Mobile App" : "Web App"}
          </span>
        </div>

        {/* Project Title - full width, never squeezed or hidden */}
        <h3 className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-bold text-white text-start leading-snug">
          {project.title}
        </h3>

        {/* Description - clamped to 7 lines with ... on mobile, full on tablet/desktop */}
        <p
          className="mt-2 text-[11px] sm:text-xs text-gray-300 text-start leading-relaxed line-clamp-mobile-7"
          title={project.description}
        >
          {project.description}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-col items-start gap-2.5">
        {/* Tech stack pill - max 5 icons on mobile with '...' indicator, all on desktop */}
        <div className="flex gap-1.5 items-center flex-wrap bg-black/60 rounded-full px-2.5 py-1">
          {project.tech.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="tech icon"
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain ${
                i >= 5 ? "hidden sm:block" : "block"
              }`}
              whileHover={{ rotate: 15, scale: 1.25 }}
              transition={{ duration: 0.15 }}
            />
          ))}
          {project.tech.length > 5 && (
            <span
              className="text-[10px] text-gray-400 font-bold tracking-wider sm:hidden px-0.5 leading-none select-none"
              title={`${project.tech.length - 5} more technologies`}
            >
              ...
            </span>
          )}
        </div>

        {project.link ? (
          <motion.div
            onClick={() => window.open(project.link, "_blank")}
            className="flex gap-1.5 items-center text-xs text-[#8749f2] hover:text-violet-300 font-medium cursor-pointer transition-colors duration-150"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <FontAwesomeIcon icon={faLink} className="text-[11px]" />
            <span>Visit Project</span>
          </motion.div>
        ) : (
          <div className="flex gap-1.5 items-center text-xs text-gray-500 cursor-not-allowed">
            <FontAwesomeIcon icon={faLink} className="text-[11px]" />
            <span>Visit Project</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
