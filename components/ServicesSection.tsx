"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Shovel, Route, Building2, Wrench, Compass, ChevronRight } from "lucide-react";
import { SERVICES, type WorkTypeId } from "@/lib/config";

const ICON_MAP = {
  shovel: Shovel,
  route: Route,
  building: Building2,
  pipette: Wrench,
  compass: Compass,
};

interface ServicesSectionProps {
  onSelectWorkType: (id: WorkTypeId) => void;
}

export function ServicesSection({ onSelectWorkType }: ServicesSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="servicios" className="py-10 sm:py-16 lg:py-20 bg-eg-concrete text-eg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-7 sm:mb-12"
        >
          <h2
            className="font-condensed font-extrabold uppercase text-eg-black leading-none tracking-[0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Servicios en obra vial y civil
          </h2>
        </motion.div>

        {/* Horizontal scroll-snap on mobile (~76% cards), grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-3 no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-5 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <motion.article
                key={service.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.06 }}
                className="w-[76vw] sm:w-[46vw] md:w-auto shrink-0 snap-start bg-white rounded-lg overflow-hidden border border-black/10 shadow-sm hover:shadow-industrial transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-eg-carbon">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 76vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-3 left-3 w-9 h-9 rounded bg-eg-black text-eg-gold flex items-center justify-center">
                      <Icon className="w-4 h-4" strokeWidth={1.85} />
                    </span>
                  </div>

                  {/* Gold line draws on hover */}
                  <div className="h-[3px] w-0 group-hover:w-full bg-eg-gold transition-all duration-300" />

                  <div className="p-4 sm:p-5">
                    <h3 className="font-condensed font-bold uppercase text-xl text-eg-black leading-tight mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-eg-lightText leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1">
                  <a
                    href="#presupuesto"
                    onClick={() => onSelectWorkType(service.id)}
                    className="w-full min-h-[44px] rounded bg-eg-black hover:bg-eg-gold text-white hover:text-eg-black font-display text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Consultar</span>
                    <ChevronRight className="w-4 h-4" strokeWidth={2.25} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
