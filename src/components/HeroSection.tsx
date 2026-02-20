import { motion } from "framer-motion";
import silhouetteImg from "@/assets/silhouette.png";
import EmberParticles from "./EmberParticles";

interface HeroSectionProps {
  onEnter: () => void;
}

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-void-navy via-void-deep to-void-shadow">
      {/* Ambient aura behind silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(28 100% 50% / 0.15) 0%, hsl(28 100% 50% / 0.05) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Ember particles */}
      <EmberParticles />

      {/* Headline */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider leading-tight">
          <motion.span
            className="block text-foreground text-glow-white"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            DOMINATE
          </motion.span>
          <motion.span
            className="block text-stroke text-5xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            YOUR
          </motion.span>
          <motion.span
            className="block text-primary text-glow-orange"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            CHAKRA
          </motion.span>
        </h1>
      </motion.div>

      {/* Silhouette */}
      <motion.div
        className="relative z-10 w-48 h-48 md:w-64 md:h-64 mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        <img
          src={silhouetteImg}
          alt="Meditation silhouette"
          className="w-full h-full object-contain drop-shadow-[0_0_30px_hsl(28,100%,50%,0.4)]"
        />
        {/* Glow ring around silhouette */}
        <motion.div
          className="absolute inset-[-20px] rounded-full border border-primary/30"
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ENTER button */}
      <motion.button
        onClick={onEnter}
        className="relative z-10 font-display text-lg md:text-xl tracking-[0.3em] px-12 py-4 border-2 border-primary/60 text-primary bg-transparent cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/10 glow-orange"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(28 100% 50% / 0.5)" }}
        whileTap={{ scale: 0.97 }}
      >
        ENTER
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void-shadow to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
