import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Letter milestone percentage estimates for "Madhubalan" (10 letters)
 * Proportional font widths and heights (in em units):
 * - M: wide (~15% width), ascender top
 * - a: lowercase (~9%)
 * - d: ascender (~9%)
 * - h: ascender (~9%)
 * - u: lowercase (~9%)
 * - b: ascender (~9%)
 * - a: lowercase (~9%)
 * - l: ascender (~6%)
 * - a: lowercase (~9%)
 * - n: lowercase (~9%)
 */
const LETTER_POSITIONS = [
  { char: "M", x: 6, topY: -0.22, baseY: 0.6, isAscender: true },
  { char: "a", x: 19, topY: 0.08, baseY: 0.65, isAscender: false },
  { char: "d", x: 29, topY: -0.24, baseY: 0.6, isAscender: true },
  { char: "h", x: 39, topY: -0.24, baseY: 0.6, isAscender: true },
  { char: "u", x: 50, topY: 0.08, baseY: 0.65, isAscender: false },
  { char: "b", x: 60, topY: -0.24, baseY: 0.6, isAscender: true },
  { char: "a", x: 70, topY: 0.08, baseY: 0.65, isAscender: false },
  { char: "l", x: 78, topY: -0.25, baseY: 0.6, isAscender: true },
  { char: "a", x: 86, topY: 0.08, baseY: 0.65, isAscender: false },
  { char: "n", x: 94, topY: 0.08, baseY: 0.65, isAscender: false },
];

export default function CyberSpider() {
  const [hasStarted, setHasStarted] = useState(false);
  // pos.x is in percentage (0 to 100), pos.y is in em relative to the text
  const [pos, setPos] = useState({ x: 6, y: -1.2 });
  const [rotation, setRotation] = useState(0); // Facing angle
  const [isCrawling, setIsCrawling] = useState(false);
  const [rappelData, setRappelData] = useState(null); // { x, y } in % and em
  const [moveDuration, setMoveDuration] = useState(1.5);
  const isMountedRef = useRef(true);

  // Helper wait function
  const wait = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      if (!isMountedRef.current) clearTimeout(id);
    });

  // Procedural forward journey (M -> n)
  const generateForwardPath = useCallback((currentIdx = 0) => {
    const intermediatePool = [1, 2, 3, 4, 5, 6, 7, 8].filter(
      (idx) => idx > currentIdx
    );
    const numStops = Math.floor(Math.random() * 3) + 1;
    const chosenStops = intermediatePool
      .sort(() => Math.random() - 0.5)
      .slice(0, numStops)
      .sort((a, b) => a - b);

    // End target is always 'n' (index 9)
    chosenStops.push(9);

    const waypoints = [];
    const useBaseline = Math.random() > 0.65; // Occasionally walk along bottom path

    chosenStops.forEach((idx, i) => {
      const letter = LETTER_POSITIONS[idx];
      const isFinal = i === chosenStops.length - 1;
      const jitterX = (Math.random() - 0.5) * 2;
      const jitterY = (Math.random() - 0.5) * 0.05;
      const targetY = (useBaseline ? letter.baseY : letter.topY) + jitterY;

      // Slower, calmer crawling pace (1.4s to 1.9s per step)
      const speed = Math.random() * 0.5 + 1.4;
      // Relaxed pauses at letters (1.8s to 3.2s)
      const pause = isFinal
        ? Math.random() * 1000 + 2200
        : Math.random() * 1200 + 1800;

      // Occasional rappel bungee on ascender letters (M, d, h, b, l)
      const canRappel = !isFinal && letter.isAscender && Math.random() > 0.55;

      waypoints.push({
        x: Math.max(3, Math.min(96, letter.x + jitterX)),
        y: targetY,
        duration: speed,
        pause,
        rappel: canRappel,
        targetIdx: idx,
      });
    });

    return waypoints;
  }, []);

  // Procedural backward journey (n -> M)
  const generateBackwardPath = useCallback((currentIdx = 9) => {
    const intermediatePool = [8, 7, 6, 5, 4, 3, 2, 1].filter(
      (idx) => idx < currentIdx
    );
    const numStops = Math.floor(Math.random() * 3) + 1;
    const chosenStops = intermediatePool
      .sort(() => Math.random() - 0.5)
      .slice(0, numStops)
      .sort((a, b) => b - a);

    // End target is always 'M' (index 0)
    chosenStops.push(0);

    const waypoints = [];
    const useTopCrest = Math.random() > 0.45;

    chosenStops.forEach((idx, i) => {
      const letter = LETTER_POSITIONS[idx];
      const isFinal = i === chosenStops.length - 1;
      const jitterX = (Math.random() - 0.5) * 2;
      const jitterY = (Math.random() - 0.5) * 0.05;
      const targetY = (useTopCrest ? letter.topY : letter.baseY) + jitterY;

      // Slower, calmer crawling pace
      const speed = Math.random() * 0.5 + 1.4;
      const pause = isFinal
        ? Math.random() * 1000 + 2200
        : Math.random() * 1200 + 1800;

      const canRappel = !isFinal && letter.isAscender && Math.random() > 0.6;

      waypoints.push({
        x: Math.max(3, Math.min(96, letter.x + jitterX)),
        y: targetY,
        duration: speed,
        pause,
        rappel: canRappel,
        targetIdx: idx,
      });
    });

    return waypoints;
  }, []);

  // Main autonomous lifecycle runner
  useEffect(() => {
    isMountedRef.current = true;

    const startLife = async () => {
      // 1. Wait for initial home name slide-in animation to finish (duration: 3s + buffer)
      await wait(3200);
      if (!isMountedRef.current) return;

      // 2. Initial arrival: Rappel drop calmly from ceiling onto 'M'
      setHasStarted(true);
      setRappelData({ x: 6, y: -1.3 });
      setPos({ x: 6, y: -1.3 });
      setRotation(0);
      await wait(100);

      // Rappel down smoothly onto letter 'M' (calm 1.5s descent)
      setMoveDuration(1.5);
      setIsCrawling(true);
      setPos({ x: 6, y: LETTER_POSITIONS[0].topY });
      await wait(1550);
      setIsCrawling(false);

      // Retract/snip initial silk thread
      setRappelData(null);
      await wait(900);

      // 3. Continuous procedural autonomous travel loop
      let direction = "forward"; // 'forward' (M -> n) or 'backward' (n -> M)
      let currentIdx = 0;

      while (isMountedRef.current) {
        if (direction === "forward") {
          // Face right (0 deg)
          setRotation(0);
          await wait(350);

          const waypoints = generateForwardPath(currentIdx);
          for (const wp of waypoints) {
            if (!isMountedRef.current) break;

            // Tilt pitch according to slope (climbing up vs walking down)
            const dy = wp.y - pos.y;
            const tiltAngle = dy > 0.1 ? 18 : dy < -0.1 ? -18 : 0;
            setRotation(tiltAngle);

            // Crawl to waypoint at a calm, deliberate speed
            setMoveDuration(wp.duration);
            setIsCrawling(true);
            setPos({ x: wp.x, y: wp.y });
            await wait(wp.duration * 1000);
            setIsCrawling(false);
            setRotation(0);

            // Occasional calm rappel bungee drop on tall letters
            if (wp.rappel && isMountedRef.current) {
              await wait(400);
              const anchor = { x: wp.x, y: wp.y };
              setRappelData(anchor);

              // Drop down 0.65em on silvery silk line
              setMoveDuration(1.1);
              setIsCrawling(true);
              setPos({ x: wp.x, y: wp.y + 0.65 });
              await wait(1150);
              setIsCrawling(false);

              // Dangle & look around calmly in mid-air
              setRotation(14);
              await wait(450);
              setRotation(-14);
              await wait(500);
              setRotation(0);
              await wait(450);

              // Climb back up on the silk thread
              setMoveDuration(1.0);
              setIsCrawling(true);
              setPos({ x: wp.x, y: wp.y });
              await wait(1050);
              setIsCrawling(false);
              setRappelData(null);
            }

            // Pause at letter: curious look around & rest
            const lookAngle = Math.random() > 0.5 ? 20 : -20;
            setRotation(lookAngle);
            await wait(wp.pause * 0.4);
            setRotation(0);
            await wait(wp.pause * 0.6);

            currentIdx = wp.targetIdx;
          }

          // Arrived at 'n' (end of name): turn 180 degrees to face left
          if (!isMountedRef.current) break;
          setRotation(180);
          direction = "backward";
          await wait(1600);
        } else {
          // Backward journey (n -> M)
          setRotation(180);
          await wait(350);

          const waypoints = generateBackwardPath(currentIdx);
          for (const wp of waypoints) {
            if (!isMountedRef.current) break;

            const dy = wp.y - pos.y;
            const tiltAngle = 180 + (dy > 0.1 ? -18 : dy < -0.1 ? 18 : 0);
            setRotation(tiltAngle);

            setMoveDuration(wp.duration);
            setIsCrawling(true);
            setPos({ x: wp.x, y: wp.y });
            await wait(wp.duration * 1000);
            setIsCrawling(false);
            setRotation(180);

            // Rappel bungee drop going backward
            if (wp.rappel && isMountedRef.current) {
              await wait(400);
              const anchor = { x: wp.x, y: wp.y };
              setRappelData(anchor);

              setMoveDuration(1.1);
              setIsCrawling(true);
              setPos({ x: wp.x, y: wp.y + 0.65 });
              await wait(1150);
              setIsCrawling(false);

              setRotation(194);
              await wait(450);
              setRotation(166);
              await wait(450);
              setRotation(180);
              await wait(450);

              setMoveDuration(1.0);
              setIsCrawling(true);
              setPos({ x: wp.x, y: wp.y });
              await wait(1050);
              setIsCrawling(false);
              setRappelData(null);
            }

            const lookAngle = Math.random() > 0.5 ? 160 : 200;
            setRotation(lookAngle);
            await wait(wp.pause * 0.4);
            setRotation(180);
            await wait(wp.pause * 0.6);

            currentIdx = wp.targetIdx;
          }

          // Arrived back at 'M': turn around to face right again
          if (!isMountedRef.current) break;
          setRotation(0);
          direction = "forward";
          await wait(1600);
        }
      }
    };

    startLife();

    return () => {
      isMountedRef.current = false;
    };
  }, [generateForwardPath, generateBackwardPath]);

  // Interactive spook: when user hovers or taps the spider, it does a quick startled hop!
  const handleSpook = () => {
    if (isCrawling) return;
    setIsCrawling(true);
    setRotation((prev) => prev + (Math.random() > 0.5 ? 25 : -25));
    setPos((prev) => ({
      ...prev,
      y: prev.y - 0.18,
    }));
    setTimeout(() => {
      setPos((prev) => ({
        ...prev,
        y: prev.y + 0.18,
      }));
      setIsCrawling(false);
    }, 350);
  };

  if (!hasStarted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-30 select-none">
      {/* Clean, subtle silvery silk thread when rappelling (no blurry halo) */}
      {rappelData && (
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          style={{ zIndex: 25 }}
        >
          <line
            x1={`${rappelData.x}%`}
            y1={`${rappelData.y + 0.25}em`}
            x2={`${pos.x}%`}
            y2={`${pos.y + 0.25}em`}
            stroke="rgba(248, 250, 252, 0.75)"
            strokeWidth="0.9"
            strokeDasharray="2, 1"
            style={{
              filter: "drop-shadow(0 1px 1.5px rgba(0,0,0,0.8))",
            }}
          />
        </svg>
      )}

      {/* Spider Container - exactly half of letter size (0.52em) */}
      <motion.div
        animate={{
          left: `${pos.x}%`,
          top: `${pos.y}em`,
          rotate: rotation,
        }}
        transition={{
          left: { duration: moveDuration, ease: "easeInOut" },
          top: { duration: moveDuration, ease: "easeInOut" },
          rotate: { duration: 0.35, ease: "easeOut" },
        }}
        onClick={handleSpook}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
        style={{
          width: "0.52em",
          height: "0.52em",
          transformOrigin: "center center",
          willChange: "left, top, transform",
        }}
        whileHover={{ scale: 1.25 }}
        title="Cyber Spider"
      >
        <svg
          viewBox="0 0 32 32"
          className={`w-full h-full overflow-visible ${
            isCrawling ? "spider-scuttling" : "spider-idle"
          }`}
          style={{
            filter: "drop-shadow(0 1.5px 2px rgba(0, 0, 0, 0.9))",
          }}
        >
          {/* 8 Articulated Cyber Legs - Crisp Platinum Silver / Chrome */}
          {/* Leg Group A */}
          <g className="spider-legs-a">
            {/* Leg 1: Front-Left */}
            <path
              d="M 13 13 Q 7 6 3 5"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Leg 3: Mid-Rear-Left */}
            <path
              d="M 13 18 Q 6 21 2 25"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Leg 2: Mid-Front-Right */}
            <path
              d="M 19 15 Q 26 12 30 13"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Leg 4: Rear-Right */}
            <path
              d="M 18 19 Q 24 26 28 30"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* Leg Group B */}
          <g className="spider-legs-b">
            {/* Leg 2: Mid-Front-Left */}
            <path
              d="M 13 15 Q 6 12 2 13"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Leg 4: Rear-Left */}
            <path
              d="M 14 19 Q 8 26 4 30"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Leg 1: Front-Right */}
            <path
              d="M 19 13 Q 25 6 29 5"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Leg 3: Mid-Rear-Right */}
            <path
              d="M 19 18 Q 26 21 30 25"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* Abdomen (Rear Body) - Gunmetal Slate with crisp silver border */}
          <ellipse
            cx="16"
            cy="21"
            rx="4.2"
            ry="5.5"
            fill="#0f172a"
            stroke="#f1f5f9"
            strokeWidth="1.1"
          />

          {/* Refined Platinum Facet / Accent on Abdomen */}
          <polygon
            points="16,18 18.5,21.5 13.5,21.5"
            fill="#cbd5e1"
            opacity="0.9"
          />
          <polygon
            points="16,24.5 18.5,21 13.5,21"
            fill="#94a3b8"
            opacity="0.85"
          />
          <circle cx="16" cy="21" r="0.9" fill="#ffffff" />

          {/* Cephalothorax (Front Body Plate) - Metallic charcoal with silver rim */}
          <ellipse
            cx="16"
            cy="14"
            rx="3.4"
            ry="3.8"
            fill="#1e293b"
            stroke="#e2e8f0"
            strokeWidth="1.1"
          />

          {/* Pedipalps (Front feelers) */}
          <path
            d="M 14.5 11 Q 13.5 8 14 6"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M 17.5 11 Q 18.5 8 18 6"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <circle cx="14" cy="6" r="0.5" fill="#f8fafc" />
          <circle cx="18" cy="6" r="0.5" fill="#f8fafc" />

          {/* Crisp, Subtle Golden-Amber Eyes (No blurry glow, clean points) */}
          <circle
            cx="14.8"
            cy="12"
            r="0.85"
            fill="#fbbf24"
          />
          <circle
            cx="17.2"
            cy="12"
            r="0.85"
            fill="#fbbf24"
          />
          {/* Tiny specular pinpoint glint in eyes */}
          <circle cx="14.6" cy="11.8" r="0.3" fill="#ffffff" />
          <circle cx="17.0" cy="11.8" r="0.3" fill="#ffffff" />
        </svg>
      </motion.div>
    </div>
  );
}
