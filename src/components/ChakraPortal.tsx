import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chakras } from "@/lib/chakraData";
import ChakraNode from "./ChakraNode";
import ChakraInfoPanel from "./ChakraInfoPanel";

const CosmicParticles = ({ activeColor }: { activeColor: string | null }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: activeColor ?? "hsl(0 0% 100% / 0.3)",
          }}
          animate={{
            y: ["100vh", "-10vh"],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const ChakraPortal = () => {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);

  const active = chakras.find((c) => c.id === activeChakra) ?? null;

  const handleClick = (id: string) => {
    setActiveChakra((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-void-deep via-void-shadow to-void-shadow">
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(222 50% 3% / 0.8) 100%)",
        }}
      />

      {/* Ambient chakra color tint */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${active.color}12 0%, ${active.color}06 40%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Cosmic mist SVG overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <filter id="mist">
          <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="3" seed="2">
            <animate attributeName="seed" from="0" to="100" dur="30s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
        <rect width="100%" height="100%" fill="hsl(0 0% 100% / 0.04)" filter="url(#mist)" />
      </svg>

      {/* Floating particles */}
      <CosmicParticles activeColor={active?.color ?? null} />

      {/* Title */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase text-foreground/30">
          Activate Your Energy
        </h2>
      </motion.div>

      {/* ===== BODY + CHAKRA SYSTEM ===== */}
      <motion.div
        className="relative"
        style={{ width: "min(320px, 70vw)", height: "min(600px, 80vh)" }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Vertical energy column behind body */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[5%] bottom-[25%] w-[2px] z-0">
          {/* Base column */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, #B026FF22, #5E5CFF22, #00B3FF22, #00E67622, #FFD50022, #FF7A0022, #FF3B3B22)`,
              filter: "blur(4px)",
            }}
          />
          {/* Brighter when active */}
          {active && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              style={{
                background: `linear-gradient(to bottom, transparent, ${active.color}40, transparent)`,
                filter: "blur(6px)",
              }}
            />
          )}
        </div>

        {/* Silhouette body - meditation pose SVG */}
        <motion.div
          className="absolute inset-0 z-[1] flex items-center justify-center"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 200 400"
            className="w-full h-full"
            style={{
              filter: `drop-shadow(0 0 12px ${active?.color ?? "#FF7A00"}33)`,
            }}
          >
            <defs>
              <radialGradient id="auraGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor={active?.color ?? "#FF7A00"} stopOpacity="0.08" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Aura mist */}
            <motion.ellipse
              cx="100"
              cy="200"
              rx="90"
              ry="180"
              fill="url(#auraGrad)"
              animate={{ rx: [85, 95, 85], ry: [175, 185, 175] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Meditation silhouette */}
            <path
              d="M100 30 
                 C88 30, 78 40, 78 55
                 C78 70, 88 80, 100 80
                 C112 80, 122 70, 122 55
                 C122 40, 112 30, 100 30Z
                 
                 M80 85
                 C70 88, 62 95, 58 110
                 L40 160
                 C36 168, 32 180, 35 185
                 C38 190, 45 188, 50 182
                 L65 148
                 
                 M120 85
                 C130 88, 138 95, 142 110
                 L160 160
                 C164 168, 168 180, 165 185
                 C162 190, 155 188, 150 182
                 L135 148
                 
                 M78 82
                 L72 95
                 C68 105, 66 120, 68 140
                 L70 160
                 C72 175, 76 190, 80 200
                 L85 230
                 C90 245, 85 258, 72 265
                 L45 280
                 C35 285, 30 290, 30 300
                 C30 310, 40 312, 50 308
                 L85 288
                 C95 282, 100 275, 100 268
                 
                 M122 82
                 L128 95
                 C132 105, 134 120, 132 140
                 L130 160
                 C128 175, 124 190, 120 200
                 L115 230
                 C110 245, 115 258, 128 265
                 L155 280
                 C165 285, 170 290, 170 300
                 C170 310, 160 312, 150 308
                 L115 288
                 C105 282, 100 275, 100 268"
              fill="#000000"
              stroke={active?.color ?? "#FF7A00"}
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </svg>
        </motion.div>

        {/* Chakra nodes along the body */}
        {chakras.map((chakra, i) => (
          <ChakraNode
            key={chakra.id}
            chakra={chakra}
            isActive={activeChakra === chakra.id}
            isAnyActive={activeChakra !== null}
            onClick={() => handleClick(chakra.id)}
            index={i}
          />
        ))}

        {/* Energy burst on activation */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={`burst-${active.id}`}
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-[2]"
              style={{
                top: `${active.yPercent}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0.8, scale: 0.5 }}
              animate={{ opacity: 0, scale: 3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${active.color}60 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Info Panel */}
      <ChakraInfoPanel chakra={active} />
    </div>
  );
};

export default ChakraPortal;
