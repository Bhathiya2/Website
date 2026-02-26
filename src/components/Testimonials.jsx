import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { getFeedbacks } from "../api/FeedbackApi";
import user from '../assets/avtr.jpg';

import "swiper/css";
import "swiper/css/pagination";

const defaultTestimonials = [
  { name: 'Customer A', role: 'Manager', image: user, text: 'Great product.', rating: 5, company: '', stat: '' },
  { name: 'Customer B', role: 'Engineer', image: user, text: 'Solid service.', rating: 5, company: '', stat: '' },
];

function generateAvatarDataUrl(name) {
  const initials = (name || '')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  const n = (name || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hues = [200, 180, 220, 260, 140, 320];
  const hue = hues[n % hues.length];
  const bg = `hsl(${hue} 60% 30%)`;
  const fg = '#ffffff';

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' fill='${bg}' rx='18' ry='18'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='40' fill='${fg}'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function Testimonials() {
  const [items, setItems] = useState(defaultTestimonials);
  useEffect(() => {
    let mounted = true;
    getFeedbacks()
      .then((data) => {
        if (!mounted) return;
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped = data.map((f) => ({
          name: f.author || f.name || 'Anonymous',
          role: f.position || f.role || '',
          // use project asset avatar for all feedbacks
          image: user,
          text: f.message || f.text || f.body || '',
          rating: Number(f.rating) || 0,
          company: f.company || '',
          stat: f.stat || ''
        }));
        setItems(mapped);
      })
      .catch((err) => {
        console.warn('Failed to load feedbacks for testimonials', err);
      });
    return () => { mounted = false };
  }, []);

  return (
    <section className="relative py-32 bg-transparent overflow-hidden z-10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      <div className="relative max-w-350 mx-auto px-6">
        {/* Advanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
            <div className="max-w-2xl relative">
                <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "12px" }}
                        className="h-3 w-3 bg-cyan-400 rounded-full animate-pulse"
                    />
                    <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.5em] font-black"
                    >
                        Verified Client Statistics [SYS-04]
                    </motion.span>
                </div>

                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter"
                >
                    TRUSTED BY <br/>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic">INDUSTRY LEADERS</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-zinc-500 font-medium text-sm max-w-lg border-l-2 border-cyan-500/30 pl-6"
                >
                    Real-time operational feedback from global partners utilizing our 
                    proprietary neural optimization engine.
                </motion.p>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-5 bg-black/40 backdrop-blur-xl border border-white/5 p-4 rounded-xl"
            >
                <div className="pr-4 border-r border-white/10">
                    <div className="flex text-cyan-400 gap-0.5 mb-0.5">
                        {[1,2,3,4,5].map((s) => <Star key={s} size={10} fill="currentColor" />)}
                    </div>
                    <div className="text-white font-black text-xs leading-none tracking-tighter">5.0 SCORE</div>
                </div>
                <div>
                    <div className="text-cyan-400 font-mono text-[9px] font-black leading-none">ACTIVE_NODES</div>
                    <div className="text-white font-bold text-sm tracking-tight italic">500+ PARTNERS</div>
                </div>
            </motion.div>
        </div>

        {/* Advanced Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 6000 }}
          pagination={{ 
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} w-12! h-1! rounded-none! bg-transparent/20! transition-all! duration-500!"></span>`;
            }
          }}
          className="pb-32! testimonials-swiper"
        >
          {items.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <motion.div 
                whileHover={{ y: -5 }}
                className="h-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative flex flex-col group overflow-hidden"
              >
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/40 transition-all duration-500" />

                {/* Stat Badge */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-transparent/5 border border-white/10 px-3 py-1.5 rounded-lg">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                       <span className="text-cyan-400 text-[9px] uppercase font-mono font-black tracking-widest">{t.stat}</span>
                    </div>
                    <div className="text-white/5 font-mono text-[10px] group-hover:text-cyan-400/20 transition-colors">
                        REF_ID: 00{i+1}
                    </div>
                </div>

                <div className="relative grow">
                  <p className="text-base text-zinc-400 leading-relaxed font-medium group-hover:text-zinc-200 transition-colors duration-500">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="relative">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                      </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-0.5 uppercase tracking-tight">{t.name}</h4>
                    <p className="text-cyan-400/60 text-[9px] font-black tracking-widest uppercase">{t.role} // {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
