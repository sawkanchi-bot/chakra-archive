import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ChakraPortal from "@/components/ChakraPortal";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleEnter = () => {
    setTransitioning(true);
    setTimeout(() => {
      setEntered(true);
      setTransitioning(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-void-shadow overflow-hidden">
      {/* Transition flash */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.1, 0.8, 1, 0],
              scale: [1, 1, 1, 1.5, 2],
            }}
            transition={{ duration: 1.2, times: [0, 0.2, 0.5, 0.7, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="hero"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ChakraPortal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
