import { motion, AnimatePresence } from "framer-motion";
import type { ChakraInfo } from "@/lib/chakraData";

interface ChakraInfoPanelProps {
  chakra: ChakraInfo | null;
}

const ChakraInfoPanel = ({ chakra }: ChakraInfoPanelProps) => {
  return (
    <AnimatePresence mode="wait">
      {chakra && (
        <motion.div
          key={chakra.id}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-20"
          initial={{ opacity: 0, y: 30, scaleX: 0.8 }}
          animate={{ opacity: 1, y: 0, scaleX: 1 }}
          exit={{ opacity: 0, y: 15, scaleX: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="relative p-5"
            style={{
              borderLeft: `2px solid ${chakra.color}`,
              borderRight: `2px solid ${chakra.color}20`,
              backgroundColor: `${chakra.color}08`,
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Scan line */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[1px]"
              style={{ backgroundColor: chakra.color, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            {/* Code name */}
            <motion.h2
              className="font-display text-lg md:text-xl font-bold tracking-[0.3em] uppercase mb-0.5"
              style={{
                color: chakra.color,
                textShadow: `0 0 12px ${chakra.color}60`,
              }}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {chakra.codeName}
            </motion.h2>

            {/* Sanskrit + location */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground/40">
                {chakra.sanskrit}
              </span>
              <span className="w-[3px] h-[3px]" style={{ backgroundColor: chakra.color }} />
              <span className="font-body text-xs text-foreground/30">{chakra.location}</span>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-3"
              style={{
                background: `linear-gradient(90deg, ${chakra.color}60, ${chakra.color}10, transparent)`,
              }}
            />

            {/* Description */}
            <p className="font-body text-sm leading-relaxed text-foreground/70 mb-3">
              {chakra.description}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between font-display text-[10px] tracking-[0.3em] uppercase">
              <span className="text-foreground/30">
                TYPE: <span style={{ color: chakra.color }}>{chakra.element}</span>
              </span>
              <span className="text-foreground/30">
                FREQ: <span style={{ color: chakra.color }}>{chakra.mantra}</span>
              </span>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-0 h-[1px]"
              style={{ backgroundColor: chakra.color }}
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChakraInfoPanel;
