"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, MessageCircle, Instagram, ChevronRight } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { NAV_LINKS, SITE_CONFIG, buildWhatsAppUrl } from "@/lib/config";

export function ClosingAndFooter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* L) CONTACTO Y CIERRE */}
      <section id="contacto" className="relative bg-eg-black text-white overflow-hidden">
        <div className="relative py-14 sm:py-20 lg:py-24">
          <Image
            src={SITE_CONFIG.closingImage}
            alt={SITE_CONFIG.closingImageAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/92 via-[#0D0D0D]/82 to-[#0D0D0D]/75"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <h2
                className="font-condensed font-extrabold uppercase text-white leading-none tracking-[0.02em] mb-4"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
              >
                Empecemos tu próxima obra
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mb-7">
                {SITE_CONFIG.ctaLabel}. Escribinos directo por WhatsApp y coordinamos relevamiento y presupuesto en La Plata y alrededores.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={buildWhatsAppUrl(
                    "Hola Evergreen Construcciones! Quiero consultar por un presupuesto para mi próxima obra."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-eg-whatsapp hover:bg-eg-whatsappDark text-eg-black font-bold text-sm sm:text-base px-7 py-4 min-h-[52px] rounded transition-colors shadow-industrial"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2} />
                  <span>{SITE_CONFIG.ctaLabel}</span>
                </a>

                <a
                  href="#presupuesto"
                  className="inline-flex items-center justify-center gap-1.5 border border-white/35 hover:border-eg-gold hover:text-eg-gold text-white font-display text-xs font-bold uppercase tracking-[0.1em] px-5 py-3.5 min-h-[48px] rounded transition-colors"
                >
                  <span>Completar formulario</span>
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-eg-gold" />
                  {SITE_CONFIG.address}
                </span>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-eg-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-eg-whatsapp" />
                  {SITE_CONFIG.whatsappDisplay}
                </a>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-eg-gold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-eg-gold" />
                  {SITE_CONFIG.instagramHandle}
                </a>
              </div>
            </motion.div>

            {/* Google Maps Embed: Avenida 38, La Plata */}
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-eg-graphite bg-eg-carbon shadow-industrial h-60 sm:h-72">
                <iframe
                  title="Ubicación Avenida 38, La Plata, Buenos Aires"
                  src="https://www.google.com/maps?q=Avenida+38,+La+Plata,+Buenos+Aires,+Argentina&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0 grayscale-[20%] contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M) FOOTER */}
      <footer className="bg-eg-black text-white/75 py-10 border-t border-eg-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandMark size={34} />
            <div>
              <p className="font-condensed font-bold uppercase text-lg tracking-[0.08em] text-white">
                {SITE_CONFIG.brandName}
              </p>
              <p className="text-xs text-white/65 mt-0.5">
                {SITE_CONFIG.description} · {SITE_CONFIG.address}
              </p>
            </div>
          </div>

          <nav aria-label="Enlaces del pie" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-display uppercase tracking-[0.1em]">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-eg-gold transition-colors py-1">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Evergreen Construcciones"
              className="w-11 h-11 rounded border border-eg-graphite hover:border-eg-gold text-white flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Evergreen Construcciones"
              className="w-11 h-11 rounded border border-eg-graphite hover:border-eg-whatsapp text-white flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-eg-graphite flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/55">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName}. Todos los derechos reservados.</p>
          <p>WhatsApp: {SITE_CONFIG.whatsappDisplay} · {SITE_CONFIG.instagramHandle}</p>
        </div>
      </footer>

      {/* N) ELEMENTOS FLOTANTES */}
      <motion.a
        href={buildWhatsAppUrl("Hola Evergreen Construcciones! Quiero consultar por un presupuesto.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultá por WhatsApp"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.03, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 bg-eg-whatsapp hover:bg-eg-whatsappDark text-eg-black font-bold text-sm px-5 py-3.5 min-h-[48px] rounded-full shadow-industrial transition-colors"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={2} />
        <span>WhatsApp</span>
      </motion.a>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-eg-black/95 backdrop-blur-md border-t border-eg-graphite px-4 py-2.5 flex items-center gap-3 shadow-lg">
        <a
          href={buildWhatsAppUrl("Hola Evergreen Construcciones! Quiero consultar por un presupuesto.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] rounded bg-eg-whatsapp text-eg-black font-bold text-sm inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
          <span>WhatsApp</span>
        </a>
        <a
          href="#presupuesto"
          className="flex-1 min-h-[44px] rounded bg-eg-gold text-eg-black font-display font-bold text-xs uppercase tracking-[0.08em] inline-flex items-center justify-center"
        >
          Pedir presupuesto
        </a>
      </div>
    </>
  );
}
