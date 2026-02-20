import { useState } from "react";
import { motion } from "framer-motion";
import { chakras } from "@/lib/chakraData";
import ChakraNode from "./ChakraNode";
import ChakraInfoPanel from "./ChakraInfoPanel";
import EmberParticles from "./EmberParticles";

const ChakraPortal = () => {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);

  const active = chakras.find((c) => c.id === activeChakra) ?? null;

  const handleClick = (id: string) => {
    setActiveChakra((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-void-shadow via-void-deep to-void-shadow cosmic-mist">
      {/* Ambient color tint from active chakra */}
      {active && (
        <motion.div
          key={active.id}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${active.color}14 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Particles */}
      <EmberParticles
        color={active?.color ?? "hsl(28, 100%, 50%)"}
        count={12}
        active
      />

      {/* Title */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-display text-sm md:text-base tracking-[0.4em] uppercase text-foreground/40">
          Select Your Chakra
        </h2>
      </motion.div>

      {/* Chakra circle container */}
      <div className="relative w-[85vw] h-[85vw] max-w-[550px] max-h-[550px]">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-foreground/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[15%] rounded-full border border-foreground/[0.03]"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        {/* Center symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="font-display text-4xl md:text-5xl font-black"
            style={{ color: active?.color ?? "hsl(0 0% 100% / 0.08)" }}
            animate={{ opacity: active ? [0.6, 1, 0.6] : 0.08 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ॐ
          </motion.div>
        </div>

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
      </div>

      {/* Info Panel */}
      <ChakraInfoPanel chakra={active} />
    </div>
  );
};

export default ChakraPortal;
