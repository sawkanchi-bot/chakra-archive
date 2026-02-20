import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface EmberParticlesProps {
  color?: string;
  count?: number;
  active?: boolean;
}

const EmberParticles = ({ color = "hsl(28, 100%, 50%)", count = 20, active = true }: EmberParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    const generateParticles = () => {
      const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        size: 2 + Math.random() * 4,
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.6,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 3000);
    return () => clearInterval(interval);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 2}px ${color}, 0 0 ${p.size * 4}px ${color}`,
            }}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              opacity: [0, p.opacity, p.opacity, 0],
              y: -150 - Math.random() * 100,
              x: (Math.random() - 0.5) * 60,
              scale: [1, 1.2, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmberParticles;
