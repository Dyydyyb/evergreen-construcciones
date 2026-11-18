"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronRight, MessageCircle, Instagram } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { NAV_LINKS, SITE_CONFIG, buildWhatsAppUrl } from "@/lib/config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Gold Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-eg-gold origin-left z-50 pointer-events-none"
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-eg-black/95 backdrop-blur-md shadow-lg border-b border-eg-graphite"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:rounded"
            aria-label={`${SITE_CONFIG.brandName} - Inicio`}
          >
            <BrandMark size={34} />
            <div className="flex flex-col leading-none">
              <span className="font-condensed font-bold text-lg sm:text-xl tracking-[0.08em] uppercase text-white">
                EVERGREEN
              </span>
              <span className="font-display text-[11px] tracking-[0.2em] uppercase text-eg-gold font-semibold">
                Construcciones
              </span>
            </div>
          </a>

          {/* Desktop Anchors */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/85 hover:text-eg-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Gold CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="#presupuesto"
              className="hidden sm:inline-flex items-center gap-1.5 bg-eg-gold hover:bg-eg-goldHover text-eg-black font-display text-xs font-bold uppercase tracking-[0.1em] px-4 py-2.5 min-h-[44px] rounded transition-colors"
            >
              <span>Pedir presupuesto</span>
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded bg-eg-carbon/80 border border-eg-graphite text-white hover:border-eg-gold"
            >
              <Menu className="w-6 h-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-eg-black text-white flex flex-col justify-between p-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BrandMark size={32} />
                <span className="font-condensed font-bold text-xl tracking-[0.08em] uppercase">
                  EVERGREEN
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className="w-11 h-11 rounded bg-eg-carbon border border-eg-graphite text-white flex items-center justify-center"
              >
                <X className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Menú móvil" className="flex flex-col gap-2 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx }}
                  className="font-condensed text-3xl font-bold uppercase tracking-[0.05em] text-white hover:text-eg-gold py-2.5 border-b border-eg-graphite flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-5 h-5 text-eg-gold" />
                </motion.a>
              ))}
            </nav>

            <div className="space-y-3 pt-4 border-t border-eg-graphite">
              <a
                href={buildWhatsAppUrl("Hola Evergreen Construcciones! Quiero consultar por un presupuesto.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] rounded bg-eg-whatsapp text-eg-black font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={2} />
                <span>WhatsApp {SITE_CONFIG.whatsappDisplay}</span>
              </a>
              <div className="flex items-center justify-between text-xs text-white/75">
                <span>{SITE_CONFIG.address}</span>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-eg-gold"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{SITE_CONFIG.instagramHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
