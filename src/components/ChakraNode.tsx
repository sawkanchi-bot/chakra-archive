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

  return (
    <motion.button
      onClick={onClick}
      className="absolute flex flex-col items-center gap-2 cursor-pointer group"
      style={{
        left: `${50 + 35 * Math.cos((chakra.angle * Math.PI) / 180)}%`,
        top: `${50 + 35 * Math.sin((chakra.angle * Math.PI) / 180)}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: dimmed ? 0.25 : 1,
        scale: isActive ? 1.2 : 1,
        filter: dimmed ? "saturate(0.15)" : "saturate(1)",
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!dimmed ? { scale: isActive ? 1.25 : 1.1 } : {}}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isActive ? 100 : 70,
          height: isActive ? 100 : 70,
          background: `radial-gradient(circle, ${chakra.color}33 0%, ${chakra.color}11 50%, transparent 70%)`,
        }}
        animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core orb */}
      <motion.div
        className="relative w-10 h-10 md:w-14 md:h-14 rounded-full chakra-glow"
        style={{
          backgroundColor: chakra.color,
          boxShadow: isActive
            ? `0 0 8px ${chakra.color}, 0 0 24px ${chakra.color}B3, 0 0 60px ${chakra.color}4D, 0 0 120px ${chakra.color}1A`
            : `0 0 8px ${chakra.color}80, 0 0 20px ${chakra.color}33`,
        }}
        animate={isActive ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner bright core */}
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: `radial-gradient(circle, white 0%, ${chakra.color} 60%, transparent 100%)`,
            opacity: isActive ? 0.6 : 0.3,
          }}
        />
      </motion.div>

      {/* Label */}
      <motion.span
        className="font-display text-[10px] md:text-xs tracking-widest uppercase whitespace-nowrap"
        style={{ color: isActive ? chakra.color : "hsl(0 0% 100% / 0.6)" }}
        animate={{ opacity: dimmed ? 0.3 : 1 }}
      >
        {chakra.name}
      </motion.span>
    </motion.button>
  );
};

export default ChakraNode;
