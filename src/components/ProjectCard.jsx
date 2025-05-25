import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const ProjectCard = ({ project, idx }) => {
  return (
    <motion.div
      key={idx}
      className="relative rounded-md p-5 bg-[#1f1f1f] flex flex-col justify-between w-[260px] md:w-[280px] lg:w-[300px] min-h-[400px] md:min-h-[440px] cursor-pointer
    border border-[#3a3a3a]
     hover:border-[#8749f2] transition-shadow duration-700"
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.92,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 6px 2px rgba(135, 73, 242, 0.5)",
      }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 1.6,
        ease: "easeInOut",
        delay: idx * 0.3,
      }}
      style={{ willChange: "transform, box-shadow" }}
    >
      <div>
        <div className="rounded-md overflow-hidden w-full h-30 md:h-40">
          <img
            src={project.image}
            alt={project.type}
            className="w-full h-full object-contain transition-transform duration-400 hover:scale-[1.05]"
          />
        </div>

        <div className="mt-3 bg-black rounded p-1 flex items-center justify-center">
          <h3 className="text-sm font-medium">{project.type}</h3>
        </div>
        <p className="mt-3 text-sm text-start">{project.description}</p>
      </div>

      <div className="mt-4 flex flex-col items-start gap-3">
        <div className="flex gap-2 flex-wrap bg-black rounded-4xl px-3 py-1.5">
          {project.tech.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="language and software"
              className="w-4 h-4 md:w-5 md:h-5 object-contain"
              whileHover={{ rotate: 20, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ))}
        </div>

        {project.link ? (
          <motion.div
            onClick={() => window.open(project.link, "_blank")}
            className="flex gap-1 items-center text-sm cursor-pointer"
            whileHover={{ scale: 1.1, color: "#8749f2" }}
          >
            <FontAwesomeIcon icon={faLink} />
            <span className="text-[#8749f2]">Visit Project</span>
          </motion.div>
        ) : (
          <motion.div className="flex gap-1 items-center text-sm cursor-not-allowed text-gray-500">
            <FontAwesomeIcon icon={faLink} />
            <span>Visit Project</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
