import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chakras } from "@/lib/chakraData";
import ChakraNode from "./ChakraNode";
import ChakraInfoPanel from "./ChakraInfoPanel";

/* ── Battlefield Particles ── */
const BattlefieldParticles = ({ activeColor }: { activeColor: string | null }) => {
  const dust = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    dur: 3 + Math.random() * 5,
    size: 1 + Math.random() * 2.5,
    drift: (Math.random() - 0.5) * 30,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dust.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: activeColor ?? "hsl(0 0% 100% / 0.15)",
            borderRadius: "50%",
          }}
          animate={{
            y: ["110vh", "-10vh"],
            x: [0, p.drift, 0],
            opacity: [0, 0.25, 0.3, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/* ── Lightning Streaks ── */
const LightningStreaks = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" style={{ opacity: 0.06 }}>
    {[1, 2, 3].map((i) => (
      <motion.line
        key={i}
        x1={`${20 + i * 25}%`}
        y1="0"
        x2={`${15 + i * 25 + (Math.random() - 0.5) * 10}%`}
        y2="100%"
        stroke="white"
        strokeWidth="0.5"
        animate={{
          opacity: [0, 0.8, 0, 0, 0.5, 0],
          x1: [`${20 + i * 25}%`, `${22 + i * 25}%`],
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          repeatDelay: 3 + i * 2,
        }}
      />
    ))}
  </svg>
);

/* ── Energy Arcs between nodes ── */
const EnergyArcs = ({ activeId }: { activeId: string | null }) => {
  if (activeId) return null;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      viewBox="0 0 320 600"
      preserveAspectRatio="none"
    >
      {chakras.slice(0, -1).map((c, i) => {
        const next = chakras[i + 1];
        const x1 = 160 + c.xOffset * 48;
        const y1 = (c.yPercent / 100) * 600;
        const x2 = 160 + next.xOffset * 48;
        const y2 = (next.yPercent / 100) * 600;
        return (
          <motion.line
            key={c.id}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c.color}
            strokeWidth="0.4"
            strokeDasharray="2 6"
            animate={{
              opacity: [0.1, 0.25, 0.1],
              strokeDashoffset: [0, -20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </svg>
  );
};

/* ── Main Portal ── */
const ChakraPortal = () => {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);
  const [flashKey, setFlashKey] = useState(0);

  const active = chakras.find((c) => c.id === activeChakra) ?? null;

  const handleClick = useCallback((id: string) => {
    setActiveChakra((prev) => {
      if (prev !== id) setFlashKey((k) => k + 1);
      return prev === id ? null : id;
    });
  }, []);

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #0B0F1A 0%, #050710 40%, #0A0D18 100%)",
        perspective: "1200px",
      }}
    >
      {/* Screen shake on activation */}
      <AnimatePresence>
        {flashKey > 0 && (
          <motion.div
            key={`shake-${flashKey}`}
            className="absolute inset-0 pointer-events-none z-50"
            initial={{ x: 0 }}
            animate={{ x: [0, -3, 4, -2, 3, 0] }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* White flash frame on activation */}
      <AnimatePresence>
        {flashKey > 0 && (
          <motion.div
            key={`flash-${flashKey}`}
            className="absolute inset-0 pointer-events-none z-40"
            style={{ backgroundColor: "white" }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Heavy vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, transparent 30%, hsl(222 50% 2% / 0.85) 100%)",
        }}
      />

      {/* Smoke / turbulence */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] z-[1]">
        <filter id="battleSmoke">
          <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="4" seed="5">
            <animate attributeName="seed" from="0" to="50" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="40" />
        </filter>
        <rect width="100%" height="100%" fill="hsl(0 0% 100% / 0.03)" filter="url(#battleSmoke)" />
      </svg>

      {/* Lightning */}
      <LightningStreaks />

      {/* Ambient active color tint */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            className="absolute inset-0 pointer-events-none z-[2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: `radial-gradient(ellipse at 50% 45%, ${active.color}18 0%, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Particles */}
      <BattlefieldParticles activeColor={active?.color ?? null} />

      {/* Light rays */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {[15, 45, 70].map((left) => (
          <motion.div
            key={left}
            className="absolute top-0"
            style={{
              left: `${left}%`,
              width: 1,
              height: "100%",
              background: `linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.03), transparent)`,
              transformOrigin: "top center",
              rotate: `${(left - 50) * 0.3}deg`,
            }}
            animate={{ opacity: [0.02, 0.06, 0.02] }}
            transition={{ duration: 4 + left * 0.05, repeat: Infinity }}
          />
        ))}
      </div>

      {/* ===== CHARACTER + NODES ===== */}
      <motion.div
        className="relative z-10"
        style={{
          width: "min(340px, 75vw)",
          height: "min(620px, 82vh)",
          transformStyle: "preserve-3d",
          transform: "rotateY(-4deg) rotateX(3deg)",
        }}
      >
        {/* Energy line through body (angled) */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            left: "48%",
            top: "3%",
            bottom: "28%",
            width: 2,
            transform: "rotate(2deg)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, #C44DFF15, #7B79FF15, #1AC8FF15, #00FF8A15, #FFE01415, #FF8C1A15, #FF4A4A15)`,
              filter: "blur(6px)",
            }}
          />
          {active && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                background: `linear-gradient(to bottom, transparent 20%, ${active.color}50 50%, transparent 80%)`,
                filter: "blur(8px)",
              }}
            />
          )}
        </div>

        {/* Ninja Silhouette – power stance */}
        <motion.div
          className="absolute inset-0 z-[1] flex items-center justify-center"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 220 440"
            className="w-full h-full"
            style={{
              filter: `drop-shadow(0 0 15px ${active?.color ?? "#FF7A00"}44) drop-shadow(0 0 4px ${active?.color ?? "#FF7A00"}22)`,
            }}
          >
            <defs>
              <radialGradient id="auraFire" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor={active?.color ?? "#FF7A00"} stopOpacity="0.1" />
                <stop offset="60%" stopColor={active?.color ?? "#FF7A00"} stopOpacity="0.03" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              {/* Rim light filter */}
              <filter id="rimGlow">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </defs>

            {/* Fire-like aura */}
            <motion.ellipse
              cx="110"
              cy="200"
              rx="80"
              ry="170"
              fill="url(#auraFire)"
              animate={{
                rx: [75, 90, 75],
                ry: [165, 178, 165],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Ninja body – strong crouched power-up stance */}
            <path
              d={`
                M110 28
                C96 28, 86 40, 86 55
                C86 72, 96 82, 110 82
                C124 82, 134 72, 134 55
                C134 40, 124 28, 110 28Z

                M86 86
                L78 100
                C72 112, 68 130, 70 150
                L72 175
                C74 195, 78 210, 84 225
                L90 260
                C94 272, 90 285, 80 295
                L55 335
                C48 342, 44 352, 46 358
                C48 364, 56 362, 62 356
                L95 310
                C103 300, 108 290, 110 280

                M134 86
                L142 100
                C148 112, 152 130, 150 150
                L148 175
                C146 195, 142 210, 136 225
                L130 260
                C126 272, 130 285, 140 295
                L165 335
                C172 342, 176 352, 174 358
                C172 364, 164 362, 158 356
                L125 310
                C117 300, 112 290, 110 280

                M82 88
                C70 92, 55 100, 42 115
                L22 155
                C16 165, 18 172, 24 170
                L48 145
                C55 138, 62 128, 68 118
                L80 100

                M138 88
                C150 92, 162 98, 172 108
                L192 138
                C200 144, 202 152, 196 154
                L174 142
                C165 136, 155 125, 148 115
                L140 100
              `}
              fill="#000000"
              stroke={active?.color ?? "#FF7A00"}
              strokeWidth="0.6"
              strokeOpacity="0.35"
            />

            {/* Sharp rim light edges - shoulders, arms */}
            <path
              d={`
                M86 86 L78 100 C72 112, 68 130, 70 150
                M134 86 L142 100 C148 112, 152 130, 150 150
                M82 88 C70 92, 55 100, 42 115 L22 155
                M138 88 C150 92, 162 98, 172 108 L192 138
                M86 55 C86 40, 96 28, 110 28
                M134 55 C134 40, 124 28, 110 28
              `}
              fill="none"
              stroke={active?.color ?? "#FF7A00"}
              strokeWidth="1.2"
              strokeOpacity="0.2"
              filter="url(#rimGlow)"
            />

            {/* Glowing eyes */}
            <motion.circle
              cx="102" cy="52" r="1.5"
              fill={active?.color ?? "#FF7A00"}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                r: [1.5, 2, 1.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="118" cy="52" r="1.5"
              fill={active?.color ?? "#FF7A00"}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                r: [1.5, 2, 1.5],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            />

            {/* Cloth edges floating */}
            <motion.path
              d="M70 150 L60 170 L65 165 L58 185"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              animate={{ d: ["M70 150 L60 170 L65 165 L58 185", "M70 150 L58 172 L63 167 L55 188"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M150 150 L160 170 L155 165 L162 185"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              animate={{ d: ["M150 150 L160 170 L155 165 L162 185", "M150 150 L162 172 L157 167 L165 188"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Energy arcs between idle nodes */}
        <EnergyArcs activeId={activeChakra} />

        {/* Chakra nodes */}
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

        {/* Energy surge lines on activation */}
        <AnimatePresence>
          {active && (
            <>
              {/* Upward surge */}
              <motion.div
                key={`surge-up-${active.id}`}
                className="absolute pointer-events-none z-[3]"
                style={{
                  left: `${50 + active.xOffset * 15}%`,
                  top: `${active.yPercent}%`,
                  width: 2,
                  transformOrigin: "bottom center",
                  background: `linear-gradient(to top, ${active.color}80, transparent)`,
                }}
                initial={{ height: 0, opacity: 0.8 }}
                animate={{ height: 200, opacity: [0.8, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              {/* Downward surge */}
              <motion.div
                key={`surge-down-${active.id}`}
                className="absolute pointer-events-none z-[3]"
                style={{
                  left: `${50 + active.xOffset * 15}%`,
                  top: `${active.yPercent}%`,
                  width: 2,
                  transformOrigin: "top center",
                  background: `linear-gradient(to bottom, ${active.color}80, transparent)`,
                }}
                initial={{ height: 0, opacity: 0.8 }}
                animate={{ height: 150, opacity: [0.8, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              />
              {/* Radial burst */}
              <motion.div
                key={`burst-${active.id}`}
                className="absolute pointer-events-none z-[3]"
                style={{
                  left: `${50 + active.xOffset * 15}%`,
                  top: `${active.yPercent}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0.9, scale: 0.2 }}
                animate={{ opacity: 0, scale: 4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div
                  className="w-10 h-10"
                  style={{
                    background: `radial-gradient(circle, ${active.color}50 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Active node rim light on body */}
        {active && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(ellipse at ${50 + active.xOffset * 15}% ${active.yPercent}%, ${active.color}15 0%, transparent 40%)`,
            }}
          />
        )}
      </motion.div>

      {/* Info Panel */}
      <ChakraInfoPanel chakra={active} />
    </div>
  );
};

export default ChakraPortal;
