import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CalendarCheck, Rocket, Globe, Zap, Flag } from "lucide-react";

const timeline = [
  { year: "2008", title: "Foundation", text: "Sky Smart Technology was established with a focus on software and electronics solutions.", icon: Flag },
  { year: "2015", title: "First Projects", text: "Delivered initial web and electronic system projects for local clients.", icon: Rocket },
  { year: "2020", title: "IoT Expansion", text: "Expanded into IoT and embedded system development.", icon: Globe },
  { year: "2023", title: "Product Growth", text: "Developed custom platforms, dashboards, and mobile applications.", icon: Zap },
  { year: "Future", title: "Looking Ahead", text: "Continuously innovating in software, electronics, and smart systems.", icon: CalendarCheck }
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden text-white z-10 px-4 md:px-0">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="text-center mb-24 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-black tracking-[0.3em] text-[10px] uppercase">Timeline Protocol</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
            OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic">JOURNEY</span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-0">
          {/* Central Line */}
          <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-px bg-transparent/5 md:-translate-x-1/2"></div>
          
          <motion.div 
             className="absolute left-[8px] md:left-1/2 top-0 w-[2px] bg-cyan-400 md:-translate-x-1/2 origin-top shadow-[0_0_20px_rgba(34,211,238,0.6)]"
             style={{ height: "100%", scaleY: lineHeight }}
          />

          <div className="space-y-24 md:space-y-32">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
   const isEven = index % 2 === 0;
   const Icon = item.icon;

   return (
      <div className={`relative flex items-center w-full ${isEven ? "md:flex-row" : "md:flex-row-reverse"} justify-start md:justify-between group`}>
         
         {/* Center Node */}
         <div className="absolute left-[8px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 md:w-12 md:h-12">
            <motion.div 
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: false }}
               className="w-3 h-3 md:w-5 md:h-5 rounded-sm bg-black border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] rotate-45 relative z-10 group-hover:bg-cyan-400 transition-colors duration-500"
            />
            <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-150"></div>
         </div>

         {/* Content Card */}
         <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`w-[calc(100%-40px)] ml-8 md:ml-0 md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}
         >
            <div className="relative group/card">
                {/* Cyber Brackets (Optional detail) */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30 -translate-x-1 -translate-y-1 group-hover/card:border-cyan-400 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30 translate-x-1 translate-y-1 group-hover/card:border-cyan-400 transition-colors" />

                <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-xl hover:border-cyan-400/40 transition-all duration-500 relative overflow-hidden group-hover/card:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    
                    {/* Scanning Line Effect */}
                    <motion.div 
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-0"
                    />

                    <div className={`relative z-10 block md:flex gap-6 items-center ${isEven ? "flex-row-reverse" : "flex-row"}`}>
                        
                        {/* Year Badge */}
                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400/20 group-hover/card:text-cyan-400 font-mono transition-colors tracking-tighter shrink-0 mb-4 md:mb-0">
                            {item.year}
                        </div>

                        <div className="flex-1">
                            <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                                <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover/card:bg-cyan-400 group-hover/card:text-black transition-all">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.title}</h4>
                            </div>

                            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium group-hover/card:text-zinc-300 transition-colors">
                                {item.text}
                            </p>
                        </div>
                    </div>

                    {/* Meta Data ID */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-white/20 tracking-[0.2em] uppercase">
                        <span>SYS_LOG_{item.year}</span>
                        <span>STABLE_RELD</span>
                    </div>
                </div>
            </div>
         </motion.div>

         {/* Spacer for desktop layout balance */}
         <div className="hidden md:block md:w-[45%]"></div>
      </div>
   );
}
