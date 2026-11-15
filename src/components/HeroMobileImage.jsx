import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useCallback } from "react";
import Images from "../utils/Images";

const HeroMobileImage = () => {
  const tiltRef = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springCfg = { stiffness: 150, damping: 20, mass: 0.5 };
  const xSpring = useSpring(x, springCfg);
  const ySpring = useSpring(y, springCfg);

  const rotateX = useTransform(ySpring, [0, 1], [10, -10]);
  const rotateY = useTransform(xSpring, [0, 1], [-10, 10]);

  const glareX = useTransform(xSpring, [0, 1], [0, 100]);
  const glareY = useTransform(ySpring, [0, 1], [0, 100]);

  const handleMove = useCallback(
    (e) => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      x.set((cx - rect.left) / rect.width);
      y.set((cy - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    /* Outer: entrance animation on scroll */
    <motion.div
      className="relative h-[240px]"
      initial={{
        opacity: 0,
        scale: 0.4,
        rotateY: 60,
        rotateX: -15,
        y: 60,
        filter: "blur(18px)",
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 800 }}
    >
      {/* Inner: perpetual floating */}
      <motion.div
        className="w-full h-full"
        animate={{
          y: [0, -8, 2, -5, 0],
          x: [0, 4, -3, 5, 0],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* 3D tilt container */}
        <motion.div
          ref={tiltRef}
          className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          onMouseLeave={handleLeave}
          onTouchEnd={handleLeave}
          whileTap={{ scale: 0.96 }}
        >
          <motion.img
            src={Images.UserImages.about_Image}
            alt="Madhubalan"
            className="w-full h-full object-cover rounded-2xl"
            initial={{ scale: 1.25 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            loading="eager"
            draggable={false}
          />

          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 55%)`
              ),
              zIndex: 3,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroMobileImage;
