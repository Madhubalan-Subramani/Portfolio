import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import Images from "../utils/Images";

export default function HeroInteractiveTerminal() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [hasRunCheck, setHasRunCheck] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Smooth mouse tilt values (normalized -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics springs for realistic weight and fluid glass response
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  // 3D rotations based on mouse
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  // Specular sheen highlight coordinates
  const sheenX = useTransform(springX, [-0.5, 0.5], ["15%", "85%"]);
  const sheenY = useTransform(springY, [-0.5, 0.5], ["15%", "85%"]);

  // Scroll-driven travel: as user scrolls down, terminal glides, tilts, scales, and dissolves
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0.7]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.75, 0]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const scrollRotateZ = useTransform(scrollYProgress, [0, 1], [0, -8]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleRunSystemCheck = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRunCheck(true);
      setActiveTab("system");
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex justify-center items-center py-6 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Scroll-Driven Transformation Wrapper */}
      <motion.div
        style={{
          x: scrollX,
          y: scrollY,
          scale: scrollScale,
          opacity: scrollOpacity,
          rotateX: scrollRotateX,
          rotateZ: scrollRotateZ,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 0.88, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[470px] lg:max-w-[500px]"
      >
        {/* Autonomous Floating Loop (keeps it breathing alive on mobile & idle) */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotateX: [1.5, -1.5, 1.5],
            rotateY: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main 3D Terminal Chassis */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative rounded-2xl bg-[#0b0c10]/90 border border-white/10 shadow-[0_25px_60px_-15px_rgba(135,73,242,0.4)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Ambient Purple Back-Glow */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-[#8749f2]/25 via-indigo-600/15 to-purple-800/25 rounded-3xl blur-xl opacity-60 -z-10 pointer-events-none"
              style={{ transform: "translateZ(-30px)" }}
            />

            {/* Specular Light Sheen Layer */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 opacity-40 rounded-2xl"
              style={{
                background: useTransform(
                  [sheenX, sheenY],
                  ([x, y]) =>
                    `radial-gradient(circle 280px at ${x} ${y}, rgba(255,255,255,0.18) 0%, rgba(135,73,242,0.06) 40%, transparent 70%)`
                ),
              }}
            />

            {/* Terminal Header Bar with Mac Buttons & Interactive Tabs */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#12131a]/95 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-[0_0_6px_#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-[0_0_6px_#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-[0_0_6px_#27c93f]" />
                <span className="ml-2 text-[10px] sm:text-xs font-mono text-gray-400">
                  madhu@dev-core:~
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1">
                {[
                  { id: "profile", label: "Profile.ts" },
                  { id: "stack", label: "Stack.json" },
                  { id: "system", label: "System.log" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#8749f2]/20 text-[#a855f7] border border-[#8749f2]/40 font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code / Content Area */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[220px] sm:min-h-[240px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1 text-gray-300"
                  >
                    <p className="text-gray-500 text-[11px] sm:text-xs">
                      // Senior Full-Stack Architect
                    </p>
                    <p>
                      <span className="text-[#c084fc]">const</span>{" "}
                      <span className="text-[#38bdf8]">Madhubalan</span>{" "}
                      <span className="text-gray-400">:</span>{" "}
                      <span className="text-amber-300">Developer</span>{" "}
                      <span className="text-gray-400">= &#123;</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-gray-400">role:</span>{" "}
                      <span className="text-emerald-400">"Full-Stack Developer"</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-gray-400">experience:</span>{" "}
                      <span className="text-amber-400">4</span>{" "}
                      <span className="text-gray-400">// Years Production</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-gray-400">coreStack:</span>{" "}
                      <span className="text-gray-400">[</span>
                      <span className="text-cyan-300">"React"</span>,{" "}
                      <span className="text-emerald-300">"Node"</span>,{" "}
                      <span className="text-amber-300">"Python"</span>,{" "}
                      <span className="text-blue-300">"TypeScript"</span>
                      <span className="text-gray-400">]</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-gray-400">specialty:</span>{" "}
                      <span className="text-emerald-400">
                        "High-Scale Architecture & Real-Time Telemetry"
                      </span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-gray-400">status:</span>{" "}
                      <span className="text-emerald-300 font-semibold">
                        "🟢 Available for Opportunities"
                      </span>
                    </p>
                    <p className="text-gray-400">&#125;;</p>
                  </motion.div>
                )}

                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1 text-gray-300"
                  >
                    <p className="text-gray-400">&#123;</p>
                    <p className="pl-4">
                      <span className="text-[#38bdf8]">"frontend"</span>:{" "}
                      <span className="text-gray-400">[</span>
                      <span className="text-emerald-300">"React 19"</span>,{" "}
                      <span className="text-cyan-300">"TypeScript"</span>,{" "}
                      <span className="text-violet-300">"Tailwind CSS"</span>,{" "}
                      <span className="text-pink-300">"Redux"</span>
                      <span className="text-gray-400">]</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-[#38bdf8]">"backend"</span>:{" "}
                      <span className="text-gray-400">[</span>
                      <span className="text-emerald-400">"Node.js"</span>,{" "}
                      <span className="text-amber-300">"Python"</span>,{" "}
                      <span className="text-cyan-300">"REST APIs"</span>,{" "}
                      <span className="text-blue-300">"SSE Streams"</span>
                      <span className="text-gray-400">]</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-[#38bdf8]">"database"</span>:{" "}
                      <span className="text-gray-400">[</span>
                      <span className="text-orange-300">"MySQL"</span>,{" "}
                      <span className="text-amber-400">"Firebase"</span>
                      <span className="text-gray-400">]</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-[#38bdf8]">"productionReady"</span>:{" "}
                      <span className="text-emerald-400 font-semibold">true</span>
                    </p>
                    <p className="text-gray-400">&#125;</p>
                  </motion.div>
                )}

                {activeTab === "system" && (
                  <motion.div
                    key="system"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1.5 text-xs text-gray-300"
                  >
                    <p className="text-emerald-400 flex items-center gap-1.5">
                      <span>✔</span> [CryptoTrace] UTXO Lineage Graph Engine (Active)
                    </p>
                    <p className="text-cyan-400 flex items-center gap-1.5">
                      <span>✔</span> [Smart City ITMS] 50+ Endpoints Live SSE (Active)
                    </p>
                    <p className="text-violet-400 flex items-center gap-1.5">
                      <span>✔</span> [BEL Traceability] Real-Time Machine Handshake (Synced)
                    </p>
                    <p className="text-emerald-400 flex items-center gap-1.5">
                      <span>✔</span> 100% Component Test Coverage • Zero Runtime Errors
                    </p>
                    <p className="text-gray-500 pt-1">
                      $ deploy --target=production --perf=ultra
                    </p>
                    <p className="text-emerald-300 font-semibold">
                      🚀 System Status: 100% Operational • 60+ FPS
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Toolbar */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TypeScript 5.x • React 19</span>
                </div>

                <button
                  onClick={handleRunSystemCheck}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#8749f2] to-[#7c3aed] hover:from-[#9d65f8] hover:to-[#8749f2] text-white text-[10px] sm:text-xs font-semibold rounded-md shadow-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-75"
                >
                  <span>{isRunning ? "Executing..." : hasRunCheck ? "✔ Verified" : "▶ Run Tests"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Orbiting 3D Floating Tech Badges (Frameless, suspended in free 3D space) */}
        {/* 1. React.js (Top-Right) */}
        <motion.div
          className="absolute -top-4 -right-3 sm:-top-6 sm:-right-6 flex items-center gap-1.5 sm:gap-2 bg-[#12131a]/95 backdrop-blur-md border border-cyan-400/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.9)] z-40 cursor-default"
          style={{ transform: "translateZ(65px)" }}
          animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15, rotate: 5 }}
        >
          <img
            src={Images.SkillsImages.react_logo}
            alt="React"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
          <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
            React.js
          </span>
        </motion.div>

        {/* 2. Python (Bottom-Left) */}
        <motion.div
          className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 flex items-center gap-1.5 sm:gap-2 bg-[#12131a]/95 backdrop-blur-md border border-amber-400/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.9)] z-40 cursor-default"
          style={{ transform: "translateZ(75px)" }}
          animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          whileHover={{ scale: 1.15, rotate: -5 }}
        >
          <img
            src={Images.SkillsImages.python_logo}
            alt="Python"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
          <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
            Python
          </span>
        </motion.div>

        {/* 3. Node.js (Top-Left) */}
        <motion.div
          className="absolute top-1/4 -left-4 sm:-left-8 flex items-center gap-1.5 sm:gap-2 bg-[#12131a]/95 backdrop-blur-md border border-emerald-400/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.9)] z-40 cursor-default"
          style={{ transform: "translateZ(55px)" }}
          animate={{ y: [-4, 4, -4], rotate: [1.5, -1.5, 1.5] }}
          transition={{
            duration: 5.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          whileHover={{ scale: 1.15, rotate: 6 }}
        >
          <img
            src={Images.SkillsImages.node_logo}
            alt="Node.js"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
          <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
            Node.js
          </span>
        </motion.div>

        {/* 4. TypeScript (Bottom-Right) */}
        <motion.div
          className="absolute bottom-1/4 -right-4 sm:-right-8 flex items-center gap-1.5 sm:gap-2 bg-[#12131a]/95 backdrop-blur-md border border-blue-400/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.9)] z-40 cursor-default"
          style={{ transform: "translateZ(70px)" }}
          animate={{ y: [4, -4, 4], rotate: [-1.5, 1.5, -1.5] }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          whileHover={{ scale: 1.15, rotate: -6 }}
        >
          <img
            src={Images.SkillsImages.ts_logo}
            alt="TypeScript"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
          <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
            TypeScript
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
