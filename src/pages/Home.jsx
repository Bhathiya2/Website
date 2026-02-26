import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroWithServices from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import ImageTextSection from "../components/ImageTextSection";
import StatisticsHeader from "../components/StatisticsHeader";
import StatisticsSection from "../components/StatisticsSection";
import TimelineSection from "../components/TimelineSection";
import Partners from "../components/Partners";
import WhatWeDid from "../components/WhatWeDid";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import { RevealOnScroll } from "../components/RevealOnScroll";
import WarpEffect from "../components/WarpEffect";
const SmartCore3D = lazy(() => import("../components/SmartCore3D"));
import DeviceShowcase from "../components/DeviceShowcase";

const Home = () => {
  const containerRef = useRef(null);
  const coreSectionRef = useRef(null);
  const coreContentRef = useRef(null);
  const scrollProgress = useRef(0);
  const [coreVisible, setCoreVisible] = useState(false);

  // Defer heavy work: observe when core section enters viewport
  useEffect(() => {
    // ensure page is at top on mount
    window.scrollTo(0, 0);

    if (!coreSectionRef.current) return;
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCoreVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.05 },
    );
    obs.observe(coreSectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Initialize GSAP effects only when the core section becomes visible
  useEffect(() => {
    if (!coreVisible) return;
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pinning the Neural Core Section for Storytelling
      ScrollTrigger.create({
        trigger: coreSectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      // Storytelling animations for the text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: coreSectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        },
      });

      tl.fromTo(
        coreContentRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1 },
      )
        .to(
          ".intelligence-text",
          {
            letterSpacing: "0.2em",
            color: "#22d3ee",
            textShadow: "0 0 30px rgba(34,211,238,0.8)",
            duration: 1,
          },
          "+=0.5",
        )
        .to(
          coreContentRef.current,
          {
            opacity: 0.2,
            scale: 0.9,
            duration: 1,
          },
          "+=0.5",
        );

      // Parallax for the perspective grid
      gsap.to(".perspective-grid", {
        y: -100,
        rotateX: 60,
        scrollTrigger: {
          trigger: coreSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [coreVisible]);

  const { scrollYProgress: pageScrollY } = useScroll();
  const scaleX = useSpring(pageScrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-hidden bg-transparent text-white"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      <title>Sky Smart Technology | Industrial IoT & Automation</title>
      <meta
        name="description"
        content="Official website of Sky Smart Technology. Providing next-generation IoT ecosystems and precision software for industrial automation in Sri Lanka."
      />
      <link rel="canonical" href="https://skyaccount.perahara.lk/company/" />
      {/* Hyperspace Warp Effect */}
      <WarpEffect />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <RevealOnScroll>
          <section>
            <HeroWithServices />
          </section>
        </RevealOnScroll>

        {/* Immersive Neural Core Section - Responsive height */}
        <section
          ref={coreSectionRef}
          className="min-h-screen relative flex items-center justify-center overflow-hidden bg-transparent py-20 md:py-0"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />

            {/* Perspective Grid Floor */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[40vh] [mask-image:linear-gradient(to_top,black,transparent)]"
              style={{ perspective: "1000px" }}
            >
              <div
                className="perspective-grid absolute inset-0 bg-[size:60px_60px] bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)]"
                style={{
                  transform: "rotateX(45deg)",
                  transformOrigin: "bottom",
                }}
              />
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-40">
            <SmartCore3D
              scrollProgress={scrollProgress}
              className="w-full h-full max-w-none"
            />
          </div>

          {/* HUD Brackets */}
          <div className="absolute inset-0 p-10 pointer-events-none opacity-20">
            <div className="w-full h-full border-x border-cyan-500/20 relative">
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-cyan-500" />
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-cyan-500" />
              <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-cyan-500" />
              <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-cyan-500" />
            </div>
          </div>

          <div
            ref={coreContentRef}
            className="relative z-10 text-center px-6 max-w-4xl py-12 rounded-3xl backdrop-blur-sm bg-black/20 border border-white/5 shadow-[0_0_40px_rgba(6,182,212,0.05)]"
          >
            <motion.div className="relative inline-block">
              <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-6 relative z-10">
                Sky Smart <br />
                <span className="intelligence-text text-transparent bg-clip-text bg-linear-to-b from-cyan-400 to-blue-600 animate-pulse transition-all duration-700">
                  Intelligence
                </span>
              </h2>
              {/* Ghost Text Effect */}
              <motion.h2
                animate={{ opacity: [0, 0.2, 0], x: [-2, 2, -2] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 text-4xl md:text-8xl font-black uppercase tracking-tighter text-cyan-500/20 blur-sm select-none"
              >
                Sky Smart <br /> Intelligence
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-cyan-100/60 text-lg md:text-2xl font-light tracking-[0.2em] max-w-2xl mx-auto uppercase mt-8"
            >
              Building smarter digital and electronic solutions through <br />
              <span className="text-white font-bold">
                Integrated software, IoT, and embedded system innovation.
              </span>
            </motion.p>
          </div>

          {/* Floating Data Fragments */}
          {[
            { tag: "IoT_NODE", status: "ACTIVE" },
            { tag: "CLOUD_LINK", status: "STABLE" },
            { tag: "NEURAL_NET", status: "SYNCED" },
            { tag: "QUANTUM_SEC", status: "READY" },
            { tag: "DATA_CORE", status: "ONLINE" },
            { tag: "EDGE_SYNC", status: "TRANSMIT" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute text-[10px] font-mono text-cyan-400/40 pointer-events-none hidden md:block"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            >
              {"{" + item.tag + "}"}
              <br />
              {"STATUS: " + item.status}
              <br />
              {"01011001"}
            </motion.div>
          ))}
        </section>

        <RevealOnScroll>
          <section className="relative z-10 bg-transparent">
            <FeatureSection />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <ImageTextSection />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <DeviceShowcase />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <StatisticsHeader />
            <StatisticsSection />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <TimelineSection />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <Testimonials />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <Pricing />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <Partners />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="bg-transparent relative z-10">
            <WhatWeDid />
          </section>
        </RevealOnScroll>
      </motion.div>
    </div>
  );
};

export default Home;
