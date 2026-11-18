"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { WORK_LINES } from "@/lib/config";
import type { ProjectCategory } from "@/lib/projects";

interface WorkLinesStripProps {
  onSelectCategory: (cat: ProjectCategory) => void;
}

export function WorkLinesStrip({ onSelectCategory }: WorkLinesStripProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="lineas" className="bg-eg-carbon border-y border-eg-graphite py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {WORK_LINES.map((line, idx) => (
            <motion.a
              key={line.id}
              href="#obras"
              onClick={() => onSelectCategory(line.targetCategory)}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              className="group bg-eg-black hover:bg-eg-graphite/70 border border-eg-graphite hover:border-eg-gold rounded-lg p-5 flex items-center justify-between gap-4 transition-colors min-h-[76px]"
            >
              <div>
                <span className="font-condensed font-extrabold text-2xl sm:text-3xl tracking-[0.06em] uppercase text-white group-hover:text-eg-gold transition-colors block">
                  {line.label}
                </span>
                <span className="text-xs sm:text-sm text-white/75 mt-0.5 block">
                  {line.description}
                </span>
              </div>
              <span className="w-10 h-10 rounded bg-eg-carbon border border-eg-graphite group-hover:border-eg-gold text-eg-gold flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1">
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
