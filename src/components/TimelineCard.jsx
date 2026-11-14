import { motion } from "framer-motion";

const TimelineCard = ({ item, isLast }) => (
  <div className="relative w-[calc(100%-28px)] md:w-[90%]">
    {/* Stable Timeline Dot (anchored, scales in smoothly without breaking the track) */}
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute left-[-22px] top-6 w-3 h-3 bg-[#8749f2] rounded-full z-10 shadow-[0_0_8px_rgba(135,73,242,0.8)]"
    />

    {/* Continuous Vertical Connecting Line (anchored, smoothly draws down to next dot without severing) */}
    {!isLast && (
      <motion.span
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        style={{ originY: 0 }}
        className="absolute left-[-17px] top-9 w-[2px] h-[calc(100%+4px)] bg-[#8749f2]/70 z-0"
      />
    )}

    {/* Animated Card Body - smoothly glides in from the side without warping the timeline spine */}
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#1f1f1f] w-full p-4 rounded-md shadow-md hover:shadow-[#8749f2]/30 transition-shadow duration-300"
    >
      <motion.div
        className="bg-[#2a2a2a] text-xs md:text-sm px-2 py-1 rounded w-fit"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {item.year}
      </motion.div>

      <motion.div
        className="text-[#8749f2] font-semibold mt-2 pl-2 text-sm md:text-base"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
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
        viewport={{ once: false, amount: 0.1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {item.description}
      </motion.p>
    </motion.div>
  </div>
);

export default TimelineCard;
