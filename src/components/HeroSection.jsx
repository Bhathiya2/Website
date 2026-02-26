import React, { useRef, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Code,
  Smartphone,
  Cpu,
  CircuitBoard,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Web & Software Development",
    icon: <Code className="w-5 h-5" />,
    text: "Scalable, secure, and user-focused digital solutions.",
    color: "text-cyan-400",
  },
  {
    title: "Mobile Application Development",
    icon: <Smartphone className="w-5 h-5" />,
    text: "High-performance Android and cross-platform apps.",
    color: "text-cyan-400",
  },
  {
    title: "IoT & Embedded Systems",
    icon: <Cpu className="w-5 h-5" />,
    text: "Smart device integration using microcontroller-based systems.",
    color: "text-cyan-400",
  },
  {
    title: "Electronic & PCB Design",
    icon: <CircuitBoard className="w-5 h-5" />,
    text: "Custom circuit design, PCB layout, and fabrication solutions.",
    color: "text-cyan-400",
  },
];

export default function HeroWithServices() {
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const bgRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for the main content
      gsap.to(leftSideRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Background parallax
      gsap.to(bgRef.current, {
        scale: 1.2,
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      {
        /* // Staggered parallax for service cards
      gsap.to(".service-card", {
        y: (i) => -50 - i * 30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });*/
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent overflow-hidden text-white"
      onMouseMove={handleMouseMove}
    >
      <section className="relative min-h-[90vh] flex flex-col pt-32 pb-20 px-6 justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex justify-center items-center">
          {/* Main Content: Typography & Call to Action */}
          <div
            ref={leftSideRef}
            className="relative z-10 text-center mx-auto max-w-4xl"
          >
            {/* Main Headline - Professional & Corporate */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1] mb-8 uppercase">
              NextGen Software <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic">
                TECHNOLOGIES &nbsp;
              </span>
            </h1>
            <p className="text-base md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-12 mx-auto text-center font-medium">
              We bridge physical operations and digital intelligence through{" "}
              <span className="text-white">innovative</span> software and
              electronics-driven IoT technologies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-cyan-500 text-black rounded-xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-transparent/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Start Evolution <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent/5 text-white border border-white/10 rounded-xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 backdrop-blur-md hover:border-cyan-500/50 transition-all"
              >
                <PlayCircle size={20} /> Watch Demo
              </motion.button>
            </div>

            {/* Simple Stats / Features Grid - Uniform Look */}
            <div className="grid grid-cols-2 gap-4">
              {services.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="service-card flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm hover:bg-black/60 transition-colors"
                >
                  <div
                    className={`p-2 rounded-md bg-[#000000] border border-white/5 ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider mb-0.5">
                      {item.title}
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {item.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
