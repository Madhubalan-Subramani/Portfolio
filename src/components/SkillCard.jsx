import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.85,
  },
  show: (custom) => {
    const { idx = 0, isNewlyExpanded = false } =
      typeof custom === "number" ? { idx: custom } : custom || {};
    const delayIndex = isNewlyExpanded ? Math.max(0, idx - 6) : idx;
    return {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        delay: (delayIndex % 6) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      },
    };
  },
};

const AnimatedProgressbar = ({ percent, isVisible }) => {
  const progress = useMotionValue(0);
  const spring = useSpring(progress, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);
  const [textSize, setTextSize] = useState("20px");
  const [strokeWidth, setStrokeWidth] = useState(10);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => setDisplay(latest));

    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setTextSize("16px");
        setStrokeWidth(9);
      } else if (width < 768) {
        setTextSize("18px");
        setStrokeWidth(9);
      } else {
        setTextSize("20px");
        setStrokeWidth(10);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    if (isVisible) {
      progress.set(0);
      requestAnimationFrame(() => progress.set(percent));
    } else {
      progress.set(0);
    }

    return () => {
      unsubscribe();
      window.removeEventListener("resize", updateSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, percent]);

  return (
    <CircularProgressbar
      value={display}
      text={`${Math.round(display)}%`}
      strokeWidth={strokeWidth}
      styles={buildStyles({
        textSize,
        textColor: "#ffffff",
        pathColor: "#fff",
        trailColor: "#2d2d2d",
        pathTransition: "none",
      })}
    />
  );
};

const SkillCard = ({
  skill,
  isActive,
  onActivate,
  onDeactivate,
  isTouchDevice,
  idx = 0,
  isNewlyExpanded = false,
}) => {
  const [hovered, setHovered] = useState(false);

  const showProgress = isTouchDevice ? isActive : hovered;

  const handleClick = () => {
    if (isTouchDevice) {
      isActive ? onDeactivate() : onActivate();
    }
  };

  return (
    <motion.div
      className="w-full max-w-[96px] h-[105px] sm:w-[105px] sm:h-[115px] md:w-[115px] md:h-[125px] group rounded-md flex flex-col justify-evenly items-center text-center p-2 sm:p-2.5 md:p-3 border border-[#8749f2] bg-[#1c1c1c] shadow-xl transition duration-300"
      custom={{ idx, isNewlyExpanded }}
      variants={cardVariants}
      initial="hidden"
      whileInView={isNewlyExpanded ? undefined : "show"}
      animate={isNewlyExpanded ? "show" : undefined}
      viewport={isNewlyExpanded ? undefined : { once: false, amount: 0.05 }}
      whileHover={
        !isTouchDevice && {
          scale: 1.08,
          rotateY: 5,
          transition: { duration: 0.18, ease: "easeOut" },
        }
      }
      onHoverStart={() => !isTouchDevice && setHovered(true)}
      onHoverEnd={() => !isTouchDevice && setHovered(false)}
      onClick={handleClick}
    >
      <img
        src={skill.logo}
        alt={skill.name}
        className={`h-[45%] max-h-[38px] md:max-h-[48px] object-contain mb-1 transition duration-300 ${
          showProgress ? "hidden" : "block"
        }`}
      />

      <div
        className={`w-[42px] h-[42px] md:w-[54px] md:h-[54px] ${
          showProgress ? "block" : "hidden"
        }`}
      >
        <AnimatedProgressbar percent={skill.percent} isVisible={showProgress} />
      </div>

      <p className="text-[11px] sm:text-xs md:text-sm font-medium mt-1 leading-tight line-clamp-1">
        {skill.name}
      </p>
    </motion.div>
  );
};

export default SkillCard;
