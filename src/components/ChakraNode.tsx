import { motion } from "framer-motion";
import type { ChakraInfo } from "@/lib/chakraData";
import { useState } from "react";

interface ChakraNodeProps {
  chakra: ChakraInfo;
  isActive: boolean;
  isAnyActive: boolean;
  onClick: () => void;
  index: number;
}

const ChakraNode = ({ chakra, isActive, isAnyActive, onClick, index }: ChakraNodeProps) => {
  const dimmed = isAnyActive && !isActive;
  const baseOpacity = dimmed ? 0.12 : isActive ? 1 : 0.35;
  const coreSize = isActive ? 18 : 10;
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  // 3D perspective offset
  const xPos = 50 + chakra.xOffset * 15;
  const scale = chakra.depthScale;

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute flex items-center justify-center cursor-pointer z-10"
      style={{
        left: `${xPos}%`,
        top: `${chakra.yPercent}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? scale * 1.4 : scale,
      }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={!dimmed ? { scale: scale * 1.2 } : {}}
    >
      {/* Energy streaks (sharp lines radiating out) */}
      {isActive && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.div
              key={angle}
              className="absolute pointer-events-none"
              style={{
                width: 1,
                height: 30 + Math.random() * 20,
                background: `linear-gradient(to top, ${chakra.color}, transparent)`,
                transformOrigin: "bottom center",
                rotate: `${angle}deg`,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scaleY: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.4,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </>
      )}

      {/* Glitch distortion layer */}
      {isActive && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 40,
            height: 40,
            background: `${chakra.color}15`,
            clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
          }}
          animate={{
            x: [-2, 3, -1, 2, 0],
            opacity: [0, 0.4, 0, 0.3, 0],
          }}
          transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2 }}
        />
      )}

      {/* Outer electric burst */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: isActive ? 80 : 40,
          height: isActive ? 80 : 40,
          background: `radial-gradient(circle, ${chakra.color}18 0%, transparent 60%)`,
          filter: "blur(2px)",
        }}
        animate={{
          opacity: baseOpacity,
          scale: isActive ? [1, 1.5, 1] : [1, 1.15, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating electric ring 1 (SVG) */}
      <motion.svg
        className="absolute pointer-events-none"
        width={isActive ? 52 : 30}
        height={isActive ? 52 : 30}
        viewBox="0 0 52 52"
        style={{ opacity: baseOpacity * 0.9 }}
        animate={{ rotate: 360 }}
        transition={{ duration: isActive ? 1.5 : 6, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="26" cy="26" r="22"
          fill="none" stroke={chakra.color}
          strokeWidth="1.5"
          strokeDasharray="4 8 2 12"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Counter-rotating ring 2 */}
      <motion.svg
        className="absolute pointer-events-none"
        width={isActive ? 40 : 24}
        height={isActive ? 40 : 24}
        viewBox="0 0 40 40"
        style={{ opacity: baseOpacity * 0.6 }}
        animate={{ rotate: -360 }}
        transition={{ duration: isActive ? 2 : 8, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="20" cy="20" r="16"
          fill="none" stroke={chakra.color}
          strokeWidth="0.8"
          strokeDasharray="2 6 8 4"
        />
      </motion.svg>

      {/* Inner compressed energy glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: coreSize * 2.5,
          height: coreSize * 2.5,
          background: `radial-gradient(circle, ${chakra.color}90 0%, ${chakra.color}40 30%, transparent 65%)`,
          opacity: baseOpacity,
          filter: isActive ? "blur(1px)" : "none",
        }}
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bright core */}
      <motion.div
        className="relative"
        style={{
          width: coreSize,
          height: coreSize,
          backgroundColor: chakra.color,
          clipPath: isActive
            ? "polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)"
            : "circle(50%)",
          boxShadow: isActive
            ? `0 0 8px ${chakra.color}, 0 0 25px ${chakra.color}CC, 0 0 60px ${chakra.color}66, 0 0 120px ${chakra.color}33`
            : `0 0 4px ${chakra.color}80, 0 0 10px ${chakra.color}40`,
          opacity: baseOpacity,
        }}
        animate={isActive ? { rotate: [0, 45, 0], scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-[20%] rounded-full"
          style={{
            background: `radial-gradient(circle, white 0%, ${chakra.color} 60%, transparent 100%)`,
            opacity: isActive ? 0.8 : 0.2,
          }}
        />
      </motion.div>

      {/* Orbiting sparks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: isActive ? 3 : 1.5,
            height: isActive ? 3 : 1.5,
            backgroundColor: i % 2 === 0 ? chakra.color : "white",
            boxShadow: `0 0 4px ${chakra.color}`,
            opacity: baseOpacity * 0.7,
          }}
          animate={{
            x: [
              Math.cos((i * 72 * Math.PI) / 180) * (isActive ? 28 : 14),
              Math.cos(((i * 72 + 360) * Math.PI) / 180) * (isActive ? 28 : 14),
            ],
            y: [
              Math.sin((i * 72 * Math.PI) / 180) * (isActive ? 28 : 14),
              Math.sin(((i * 72 + 360) * Math.PI) / 180) * (isActive ? 28 : 14),
            ],
          }}
          transition={{
            duration: isActive ? 1.5 : 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Code name label - only on hover/active */}
      <motion.span
        className="absolute left-full ml-5 font-display text-[8px] md:text-[9px] tracking-[0.4em] uppercase whitespace-nowrap pointer-events-none"
        style={{
          color: chakra.color,
          textShadow: `0 0 8px ${chakra.color}80`,
        }}
        initial={{ opacity: 0, x: -5 }}
        animate={{
          opacity: showLabel ? (isActive ? 1 : 0.7) : 0,
          x: showLabel ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
      >
        {chakra.codeName}
      </motion.span>
    </motion.button>
  );
};

export default ChakraNode;
