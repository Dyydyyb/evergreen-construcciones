"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { SITE_CONFIG } from "@/lib/config";

export function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SITE_CONFIG.heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isMobile, shouldReduceMotion]);

  const activeSlide = isMobile
    ? SITE_CONFIG.heroSlides[0]
    : SITE_CONFIG.heroSlides[slideIndex];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.09 },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-[600px] h-[100svh] max-h-[920px] flex items-center justify-center overflow-hidden bg-eg-black">
      {/* Background crossfade slider (single static image on mobile) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSlide.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            animate={
              shouldReduceMotion || isMobile ? undefined : { scale: [1, 1.06] }
            }
            transition={{ duration: 7, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for AA contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/75 via-[#0D0D0D]/60 to-[#0D0D0D]/85"
        aria-hidden="true"
      />

      {/* Centered Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-14"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded bg-eg-black/90 border border-eg-gold/40 flex items-center justify-center shadow-industrial">
            <BrandMark size={34} />
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-display text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-eg-gold mb-3 inline-flex items-center gap-1.5"
        >
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
          <span>LA PLATA · OBRAS VIALES Y CIVILES</span>
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-condensed font-extrabold uppercase text-white leading-[1.02] tracking-[0.01em] mb-4 sm:mb-5"
          style={{ fontSize: "clamp(2.35rem, 5.5vw, 4.5rem)" }}
        >
          Construimos las bases de tu próximo proyecto
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          Movimiento de suelos, obras viales, civiles y de infraestructura. Consultá por tu presupuesto.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.a
            href="#presupuesto"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-eg-gold hover:bg-eg-goldHover text-eg-black font-display text-xs sm:text-sm font-bold uppercase tracking-[0.1em] px-7 py-3.5 min-h-[48px] rounded shadow-industrial transition-colors group"
          >
            <span>Pedir presupuesto</span>
            <ChevronRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </motion.a>

          <a
            href="#obras"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/60 hover:border-eg-gold hover:text-eg-gold text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] px-7 py-3.5 min-h-[48px] rounded transition-colors"
          >
            <span>Ver obras</span>
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center flex-nowrap gap-2 sm:gap-4 text-[11px] sm:text-sm text-white/85 font-medium overflow-x-auto no-scrollbar py-1"
        >
          <span className="whitespace-nowrap">Movimiento de suelos</span>
          <span className="text-eg-gold" aria-hidden="true">·</span>
          <span className="whitespace-nowrap">Obras viales</span>
          <span className="text-eg-gold" aria-hidden="true">·</span>
          <span className="whitespace-nowrap">Obras civiles</span>
        </motion.div>
      </motion.div>

      <motion.a
        href="#lineas"
        aria-label="Deslizar hacia líneas de trabajo"
        animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded border border-white/25 bg-eg-black/50 text-eg-gold flex items-center justify-center hover:border-eg-gold transition-colors"
      >
        <ArrowDown className="w-4 h-4" strokeWidth={2} />
      </motion.a>
    </section>
  );
}
