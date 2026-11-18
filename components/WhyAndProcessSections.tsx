"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Truck,
  FileCheck2,
  MessageSquare,
  ClipboardList,
  HardHat,
  Flag,
} from "lucide-react";
import { WHY_CHOOSE_US, WORK_PROCESS } from "@/lib/config";

const WHY_ICONS = {
  shieldCheck: ShieldCheck,
  clock: Clock,
  truck: Truck,
  fileCheck: FileCheck2,
};

const PROCESS_ICONS = {
  messageSquare: MessageSquare,
  clipboardList: ClipboardList,
  hardHat: HardHat,
  flag: Flag,
};

export function WhyAndProcessSections() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* H) POR QUÉ ELEGIRNOS */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white text-eg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-7 sm:mb-12">
            <h2
              className="font-condensed font-extrabold uppercase text-eg-black leading-none tracking-[0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Por qué elegir Evergreen
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = WHY_ICONS[item.iconName];
              return (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                  className="bg-eg-concrete/60 border border-black/10 rounded-lg p-4 sm:p-6"
                >
                  <div className="pb-3 mb-3 border-b border-eg-gold/60 flex items-center justify-between">
                    <Icon className="w-5 h-5 text-eg-black" strokeWidth={1.85} />
                    {item.metricPlaceholder !== null && (
                      <span className="font-condensed font-bold text-2xl text-eg-black tabular-nums">
                        {item.metricPlaceholder}
                      </span>
                    )}
                  </div>
                  <h3 className="font-condensed font-bold uppercase text-lg sm:text-xl text-eg-black leading-tight mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-eg-lightText leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* I) CÓMO TRABAJAMOS */}
      <section id="proceso" className="py-10 sm:py-16 lg:py-20 bg-eg-concrete text-eg-black border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-14">
            <h2
              className="font-condensed font-extrabold uppercase text-eg-black leading-none tracking-[0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Cómo trabajamos
            </h2>
          </div>

          <div className="relative">
            {/* Gold connecting line on desktop */}
            <div
              className="hidden md:block absolute top-6 left-[12%] right-[12%] h-[2px] bg-black/15 overflow-hidden"
              aria-hidden="true"
            >
              <motion.div
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full bg-eg-gold origin-left"
              />
            </div>

            <ol className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-3 no-scrollbar md:grid md:grid-cols-4 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
              {WORK_PROCESS.map((item, idx) => {
                const Icon = PROCESS_ICONS[item.iconName];
                return (
                  <motion.li
                    key={item.step}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                    className="w-[74vw] sm:w-[46vw] md:w-auto shrink-0 snap-start bg-white md:bg-transparent rounded-lg p-5 md:p-0 border border-black/10 md:border-0 relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-12 h-12 rounded bg-eg-black text-eg-gold border-2 border-eg-gold flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" strokeWidth={1.85} />
                      </span>
                      <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-eg-black">
                        Paso {item.step}
                      </span>
                    </div>
                    <h3 className="font-condensed font-bold uppercase text-xl text-eg-black mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-eg-lightText leading-relaxed">
                      {item.description}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
