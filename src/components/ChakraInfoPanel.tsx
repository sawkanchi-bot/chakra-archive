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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            className="relative p-6 border"
            style={{
              borderColor: `${chakra.color}40`,
              backgroundColor: `${chakra.color}0F`,
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: chakra.color }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: chakra.color }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: chakra.color }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: chakra.color }} />

            {/* Sanskrit name */}
            <motion.h2
              className="font-display text-2xl md:text-3xl font-bold tracking-wider mb-1"
              style={{ color: chakra.color }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {chakra.sanskrit}
            </motion.h2>

            {/* English name + location */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-sm tracking-widest uppercase text-foreground/70">
                {chakra.name} Chakra
              </span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: chakra.color }} />
              <span className="font-body text-sm text-foreground/50">{chakra.location}</span>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-4" style={{ background: `linear-gradient(90deg, transparent, ${chakra.color}60, transparent)` }} />

            {/* Description */}
            <p className="font-body text-base leading-relaxed text-foreground/80 mb-4">
              {chakra.description}
            </p>

            {/* Meta row */}
            <div className="flex items-center justify-between font-display text-xs tracking-widest uppercase">
              <span className="text-foreground/50">
                Element: <span style={{ color: chakra.color }}>{chakra.element}</span>
              </span>
              <span className="text-foreground/50">
                Mantra: <span style={{ color: chakra.color }}>{chakra.mantra}</span>
              </span>
            </div>

            {/* Animated line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px]"
              style={{ backgroundColor: chakra.color }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChakraInfoPanel;
