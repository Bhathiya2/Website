import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" }); // Optimized to only animate once

  return (
    <div ref={ref} className="relative reveal-container">
      <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 }, // Removed blur for performance
            visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
