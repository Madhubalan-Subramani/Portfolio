import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateY: -10, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 16, duration: 1.2 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.4, duration: 0.6, ease: "easeOut" },
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
        setTextSize("12px");
        setStrokeWidth(8);
      } else if (width < 768) {
        setTextSize("16px");
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
      className="w-[100px] h-[110px] md:w-[130px] md:h-[140px] group rounded-md flex flex-col justify-evenly items-center text-center p-4 border border-[#8749f2] bg-[#1c1c1c] shadow-xl transition duration-300"
      variants={cardVariants}
      whileHover={
        !isTouchDevice && {
          scale: 1.08,
          rotateY: 5,
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }
      }
      onHoverStart={() => !isTouchDevice && setHovered(true)}
      onHoverEnd={() => !isTouchDevice && setHovered(false)}
      onClick={handleClick}
    >
      <motion.img
        src={skill.logo}
        alt={skill.name}
        className={`h-[50%] object-contain mb-2 transition duration-300 ${
          showProgress ? "hidden" : "block"
        }`}
        variants={contentVariants}
      />

      <motion.div
        className={`w-[50px] h-[50px] md:w-[70px] md:h-[70px] ${
          showProgress ? "block" : "hidden"
        }`}
        variants={contentVariants}
      >
        <AnimatedProgressbar percent={skill.percent} isVisible={showProgress} />
      </motion.div>

      <motion.p className="text-xs md:text-sm mt-2" variants={contentVariants}>
        {skill.name}
      </motion.p>
    </motion.div>
  );
};

export default SkillCard;
