import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
    rotateY: -10,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      // type: "spring",
      bounce: 0.3,
      duration: 1.2,
    },
  },
};

const TimelineCard = ({ item, isLast }) => (
  <motion.div
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: false, amount: 0.1 }}
    variants={cardVariants}
    className="relative bg-[#1f1f1f] w-full md:w-[90%] p-4 rounded-md shadow-md hover:shadow-[#8749f2]/30 transition-shadow duration-500"
  >
    <span className="absolute left-[-25px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#8749f2] rounded-full z-10 shadow-md" />
    {!isLast && (
      <span className="absolute left-[-20px] top-[calc(50%+6px)] w-[2px] h-[calc(100%+12px)] md:h-[calc(100%+15px)] bg-[#8749f2] z-0" />
    )}
    <motion.div
      className="bg-[#2a2a2a] text-xs md:text-sm px-2 py-1 rounded w-fit"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
    >
      {item.year}
    </motion.div>
    <motion.div
      className="text-[#8749f2] font-semibold mt-2 pl-2 text-sm md:text-base"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {item.role}
      <span className="text-white text-sm md:text-base">
        &nbsp;&nbsp;&nbsp;- &nbsp;{item.company}
      </span>
    </motion.div>
    <motion.p
      className="text-xs md:text-sm mt-2 pl-2"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      {item.description}
    </motion.p>
  </motion.div>
);

export default TimelineCard;
