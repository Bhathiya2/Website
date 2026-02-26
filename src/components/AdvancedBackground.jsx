import React, { useEffect, useRef } from "react";

const AdvancedBackground = () => {
  const canvasRef = useRef(null);
  const scrollY = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let crystals = [];
    let arcs = [];
    let byteParticles = [];
    let flares = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const init = () => {
      particles = [];
      crystals = [];
      const count = width < 768 ? 40 : 120;

      // 1. Quantum Dust (Background particles for depth)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1000,
          size: Math.random() * 1.5,
          speed: 0.2 + Math.random() * 0.5,
          opacity: 0.1 + Math.random() * 0.4,
        });
      }

      // 2. Data Crystals (Surprising geometric elements)
      for (let i = 0; i < 6; i++) {
        crystals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 60 + Math.random() * 100,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          hue: 190 + Math.random() * 30,
        });
      }

      // 3. Byte Particles (Floating code bits)
      const byteCount = width < 768 ? 15 : 40;
      for (let i = 0; i < byteCount; i++) {
        byteParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: 0.1 + Math.random() * 0.3,
          char: Math.random() > 0.5 ? "0" : "1",
          opacity: 0.05 + Math.random() * 0.1,
          fontSize: 8 + Math.random() * 6,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleClick = () => {
      flares.push({
        x: mouse.current.x,
        y: mouse.current.y,
        size: 0,
        maxSize: 300,
        opacity: 0.8,
      });
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const draw = (t = 0) => {
      ctx.fillStyle = "#003366";
      //ctx.fillStyle = "#000508";
      //ctx.fillStyle = "#192224";
      ctx.fillRect(0, 0, width, height);

      // 0. Ambient Floating Glows (Simple motion)
      const time = t * 0.0005;
      const glowX = width / 2 + Math.cos(time * 0.5) * (width * 0.2);
      const glowY = height / 2 + Math.sin(time * 0.8) * (height * 0.2);

      const ambientGlow = ctx.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        width * 0.5,
      );
      ambientGlow.addColorStop(0, "rgba(173, 216, 230, 0.2)");
      ambientGlow.addColorStop(1, "transparent");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle Radial Gradient centered on mouse

      const scrollShift = scrollY.current * 0.5;

      // 1. Draw Quantum Dust (Deep space parallax)
      particles.forEach((p) => {
        p.z -= p.speed;
        if (p.z <= 1) p.z = 1000;

        const scale = 400 / (400 + p.z);
        const x = (p.x - width / 2) * scale + width / 2;
        const y =
          ((p.y - height / 2) * scale +
            height / 2 +
            scrollShift * scale * 0.1) %
          height;

        // Dynamic Hue based on scroll
        const hueShift = (scrollY.current / 50) % 360;
        ctx.fillStyle = `hsla(${190 + hueShift}, 80%, 55%, ${p.opacity * scale})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Data Crystals (Surprising big elements)
      crystals.forEach((c) => {
        c.rotation += c.rotSpeed;
        const yPos = (c.y - scrollShift * 0.2) % (height + 200);
        const finalY = yPos < -100 ? height + 100 : yPos;

        ctx.save();
        ctx.translate(c.x, finalY);
        ctx.rotate(c.rotation);

        // Draw Diamond/Crystal Shape
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsla(${c.hue}, 80%, 55%, 0.15)`;
        ctx.moveTo(0, -c.size);
        ctx.lineTo(c.size * 0.6, 0);
        ctx.lineTo(0, c.size);
        ctx.lineTo(-c.size * 0.6, 0);
        ctx.closePath();
        ctx.stroke();

        // Internal lines (Cyber grid look)
        ctx.beginPath();
        ctx.setLineDash([2, 5]);
        ctx.strokeStyle = `hsla(${c.hue}, 80%, 45%, 0.1)`;
        ctx.moveTo(-c.size * 0.6, 0);
        ctx.lineTo(c.size * 0.6, 0);
        ctx.moveTo(0, -c.size);
        ctx.lineTo(0, c.size);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      });

      // 3. Dynamic "Neural Arcs" (Surprising electricity jumps)
      if (Math.random() > 0.985 && arcs.length < 3) {
        arcs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: 100 + Math.random() * 200,
          angle: Math.random() * Math.PI * 2,
          life: 1,
        });
      }

      // Add random flares occasionally
      if (Math.random() > 0.995 && flares.length < 5) {
        flares.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0,
          maxSize: 50 + Math.random() * 100,
          opacity: 0.6,
        });
      }

      arcs.forEach((a, i) => {
        a.life -= 0.02;
        if (a.life <= 0) {
          arcs.splice(i, 1);
          return;
        }

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `rgba(34, 211, 238, ${a.life * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);

        let cx = a.x;
        let cy = a.y;
        for (let j = 0; j < 5; j++) {
          cx += Math.cos(a.angle) * (a.length / 5) + (Math.random() - 0.5) * 40;
          cy += Math.sin(a.angle) * (a.length / 5) + (Math.random() - 0.5) * 40;
          ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      });

      // 4. Draw Byte Particles (Floating code bits)
      ctx.font = "bold 10px monospace";
      byteParticles.forEach((b) => {
        b.y -= b.speed;
        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity})`;
        ctx.fillText(b.char, b.x, b.y);

        // Occasionally change character
        if (Math.random() > 0.99) b.char = Math.random() > 0.5 ? "0" : "1";
      });

      // 5. Draw Flares (Holographic blooms)
      flares.forEach((f, i) => {
        f.size += (f.maxSize - f.size) * 0.1;
        f.opacity -= 0.01;
        if (f.opacity <= 0) {
          flares.splice(i, 1);
          return;
        }
        const flareGrad = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          f.size,
        );
        flareGrad.addColorStop(0, `rgba(34, 211, 238, ${f.opacity * 0.4})`);
        flareGrad.addColorStop(1, "transparent");
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Grid Distortion (Reaction to Mouse & Simple Motion)
      const gridSize = width < 768 ? 60 : 100; // Increased grid size for performance
      const gridOffset = (t * 0.01) % gridSize;
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = "rgba(34, 211, 238, 0.03)";

      // Vertical Lines with mouse distortion
      for (let x = 0; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        for (let y = -gridSize; y < height + gridSize; y += gridSize / 2) {
          const finalX = x;
          const finalY = (y + gridOffset) % (height + gridSize);

          const dist = Math.hypot(
            finalX - mouse.current.x,
            finalY - mouse.current.y,
          );
          const force = Math.max(0, (250 - dist) / 250);
          const ox = (finalX - mouse.current.x) * force * 0.15;

          if (y === -gridSize) ctx.moveTo(finalX + ox, finalY);
          else ctx.lineTo(finalX + ox, finalY);
        }
        ctx.stroke();
      }

      // Horizontal Lines (Static drift)
      ctx.beginPath();
      for (let y = 0; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y + gridOffset);
        ctx.lineTo(width, y + gridOffset);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-slate-900"
    />
  );
};

export default AdvancedBackground;
