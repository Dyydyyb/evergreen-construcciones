"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MACHINERY } from "@/lib/config";

export function MachinerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <section
      id="maquinaria"
      ref={sectionRef}
      className="py-10 sm:py-16 lg:py-20 bg-eg-carbon text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-7 sm:mb-10">
          <h2
            className="font-condensed font-extrabold uppercase text-white leading-none tracking-[0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Maquinaria en obra
          </h2>
          <p className="text-sm sm:text-base text-white/75 mt-2">
            Equipos desplegados en excavación, zanjeo, nivelación y obras viales.
          </p>
        </div>

        <motion.div
          style={shouldReduceMotion ? undefined : { x: xParallax }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-2 no-scrollbar md:grid md:grid-cols-4 md:gap-5 md:mx-0 md:px-0 md:pb-0 md:overflow-visible"
        >
          {MACHINERY.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              className="w-[74vw] sm:w-[46vw] md:w-auto shrink-0 snap-start bg-eg-black border border-eg-graphite rounded-lg overflow-hidden group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-eg-black">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 74vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-eg-black/80 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="p-4 sm:p-5 border-t border-eg-graphite">
                <h3 className="font-condensed font-bold uppercase text-xl text-eg-gold mb-1">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
