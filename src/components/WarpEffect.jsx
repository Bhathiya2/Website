import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

/**
 * WarpEffect creates a "hyperspace" visual overlay that reacts to scroll velocity.
 * Unlike MotionViewport, it doesn't affect the layout, only adds a visual layer.
 */
export const WarpEffect = () => {
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Smooth the velocity
  const smoothVelocity = useSpring(scrollVelocity, { 
    stiffness: 100, 
    damping: 30,
  });

  // Map velocity to intensity (0 to 1)
  // We use Math.abs because scrolling up or down should trigger it
  const intensity = useTransform(smoothVelocity, [-1, 0, 1], [1, 0, 1]);
  
  // Opacity of the radial lines / vignette
  const opacity = useTransform(intensity, [0, 0.5], [0, 0.4]);
  
  // Scale of the "motion lines"
  const scale = useTransform(intensity, [0, 1], [0.8, 1.2]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      {/* Radial Motion Lines (Warp Speed Effect) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,182,212,0.1)_70%,rgba(6,182,212,0.2)_100%)]"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)'
        }}
      />
      
      {/* Streaking lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-transparent/20 origin-center"
            style={{
              width: '100vw',
              rotate: `${i * 18}deg`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WarpEffect;
