// layouts/MainLayout.jsx
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdvancedBackground from '../components/AdvancedBackground'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MainLayout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1, 
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)

    gsap.ticker.lagSmoothing(0)

    // Global performance class toggle
    document.documentElement.style.scrollBehavior = 'auto'; // Disable default for Lenis

    // Mobile Height Fix (for address bar jumps)
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
      window.removeEventListener('resize', setVh);
    }
  }, [])

  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/dashboard')
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/reset-password'

  return (
    <div className="font-font-primary bg-black text-white min-h-screen relative overflow-x-hidden">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Sky Smart Technology",
          "url": "https://skyaccount.perahara.lk/company",
          "logo": "https://skyaccount.perahara.lk/company/logo.png",
          "description": "Leading provider of industrial automation and IoT solutions.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Sri Lanka"
          },
          "sameAs": [
            "https://facebook.com/skysmart",
            "https://linkedin.com/company/skysmart"
          ]
        })}
      </script>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AdvancedBackground />
      </div>
      
      {/* Mobile-Only System HUD Layer */}
      <div className="fixed top-20 left-4 z-[45] md:hidden pointer-events-none">
          <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-[7px] font-mono text-white/50 uppercase tracking-[0.2em]">System_Healthy</span>
          </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAdminRoute && !isAuthRoute && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isAdminRoute && !isAuthRoute && <Footer />}
      </div>

      {/* Persistent Bottom Data Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] h-[3px] md:hidden">
         <div className="w-full h-full bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </div>
  )
}

export default MainLayout
