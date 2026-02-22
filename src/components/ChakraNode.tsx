import { motion } from "framer-motion";
import type { ChakraInfo } from "@/lib/chakraData";

interface ChakraNodeProps {
  chakra: ChakraInfo;
  isActive: boolean;
  isAnyActive: boolean;
  onClick: () => void;
  index: number;
}

const ChakraNode = ({ chakra, isActive, isAnyActive, onClick, index }: ChakraNodeProps) => {
  const dimmed = isAnyActive && !isActive;
  const baseOpacity = dimmed ? 0.15 : isActive ? 1 : 0.3;
  const coreSize = isActive ? 20 : 14;

  return (
    <motion.button
      onClick={onClick}
      className="absolute left-1/2 flex items-center justify-center cursor-pointer z-10"
      style={{
        top: `${chakra.yPercent}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.3 : 1,
      }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={!dimmed ? { scale: isActive ? 1.4 : 1.15 } : {}}
    >
      {/* Layer 5: Diffusion halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: isActive ? 120 : 60,
          height: isActive ? 120 : 60,
          background: `radial-gradient(circle, ${chakra.color}22 0%, ${chakra.color}08 40%, transparent 70%)`,
        }}
        animate={{
          opacity: baseOpacity,
          scale: isActive ? [1, 1.4, 1] : [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 4: Pulsing outer ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: isActive ? 56 : 36,
          height: isActive ? 56 : 36,
          border: `1px solid ${chakra.color}`,
          opacity: baseOpacity * 0.5,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [baseOpacity * 0.3, baseOpacity * 0.6, baseOpacity * 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3: Rotating energy ring (SVG) */}
      <motion.svg
        className="absolute pointer-events-none"
        width={isActive ? 48 : 32}
        height={isActive ? 48 : 32}
        viewBox="0 0 48 48"
        style={{ opacity: baseOpacity * 0.8 }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: isActive ? 3 : 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={chakra.color}
          strokeWidth="1"
          strokeDasharray="8 12"
          strokeLinecap="round"
          opacity={0.7}
        />
        <circle
          cx="24"
          cy="24"
          r="16"
          fill="none"
          stroke={chakra.color}
          strokeWidth="0.5"
          strokeDasharray="4 16"
          strokeLinecap="round"
          opacity={0.4}
        />
      </motion.svg>

      {/* Layer 2: Inner glow (soft radial) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: coreSize * 2.2,
          height: coreSize * 2.2,
          background: `radial-gradient(circle, ${chakra.color}80 0%, ${chakra.color}30 40%, transparent 70%)`,
          opacity: baseOpacity,
        }}
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 1: Bright solid core */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: coreSize,
          height: coreSize,
          backgroundColor: chakra.color,
          boxShadow: isActive
            ? `0 0 6px ${chakra.color}, 0 0 20px ${chakra.color}B3, 0 0 50px ${chakra.color}66, 0 0 100px ${chakra.color}33`
            : `0 0 4px ${chakra.color}80, 0 0 12px ${chakra.color}40`,
          opacity: baseOpacity,
        }}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* White-hot center */}
        <div
          className="absolute inset-[25%] rounded-full"
          style={{
            background: `radial-gradient(circle, white 0%, ${chakra.color} 70%, transparent 100%)`,
            opacity: isActive ? 0.7 : 0.25,
          }}
        />
      </motion.div>

      {/* Orbiting particle sparks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2,
            height: 2,
            backgroundColor: chakra.color,
            opacity: baseOpacity * 0.6,
          }}
          animate={{
            x: [
              Math.cos((i * 120 * Math.PI) / 180) * (isActive ? 22 : 14),
              Math.cos(((i * 120 + 360) * Math.PI) / 180) * (isActive ? 22 : 14),
            ],
            y: [
              Math.sin((i * 120 * Math.PI) / 180) * (isActive ? 22 : 14),
              Math.sin(((i * 120 + 360) * Math.PI) / 180) * (isActive ? 22 : 14),
            ],
          }}
          transition={{
            duration: isActive ? 2 : 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Label (only visible on hover/active) */}
      <motion.span
        className="absolute left-full ml-4 font-display text-[9px] md:text-[10px] tracking-[0.3em] uppercase whitespace-nowrap pointer-events-none"
        style={{ color: isActive ? chakra.color : "hsl(0 0% 100% / 0.4)" }}
        animate={{ opacity: dimmed ? 0 : isActive ? 1 : 0.5 }}
      >
        {chakra.name}
      </motion.span>
    </motion.button>
  );
};

export default ChakraNode;
