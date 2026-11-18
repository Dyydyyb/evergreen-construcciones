"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BEFORE_AFTER_PAIRS, PROJECTS } from "@/lib/projects";

function DraggableBeforeAfter({
  title,
  beforeImage,
  afterImage,
}: {
  title: string;
  beforeImage: string;
  afterImage: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-black/10 shadow-sm">
      <div className="relative aspect-[16/9] select-none overflow-hidden bg-eg-black">
        <Image src={afterImage} alt={`${title} — Después`} fill className="object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={beforeImage} alt={`${title} — Antes`} fill className="object-cover" />
        </div>
        <div
          className="absolute inset-y-0 w-[2px] bg-eg-gold pointer-events-none"
          style={{ left: `${position}%` }}
        />
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Comparar antes y después de ${title}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      <div className="p-4 flex items-center justify-between text-xs font-display font-bold uppercase tracking-[0.1em] text-eg-black">
        <span>Antes</span>
        <span>{title}</span>
        <span>Después</span>
      </div>
    </div>
  );
}

export function StagesAndBeforeAfter() {
  const shouldReduceMotion = useReducedMotion();

  const stageCards = [
    {
      stage: "INICIO DE OBRA",
      project: PROJECTS.find((p) => p.stage === "INICIO DE OBRA") || PROJECTS[5],
      caption: "Apertura, replanteo y movimiento de suelos inicial.",
    },
    {
      stage: "OBRA EN CURSO",
      project: PROJECTS.find((p) => p.stage === "OBRA EN CURSO") || PROJECTS[1],
      caption: "Zanjeo, infraestructura, bases y ejecución con maquinaria.",
    },
    {
      stage: "FINALIZACIÓN DE OBRA",
      project: PROJECTS.find((p) => p.stage === "FINALIZACIÓN DE OBRA") || PROJECTS[0],
      caption: "Nivelación terminada, accesos y entrega de obra.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-eg-concrete text-eg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-7 sm:mb-10"
        >
          <h2
            className="font-condensed font-extrabold uppercase text-eg-black leading-none tracking-[0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            {BEFORE_AFTER_PAIRS.length > 0 ? "Antes y después en obra" : "Etapas de obra"}
          </h2>
          <p className="text-sm sm:text-base text-eg-lightText mt-2">
            {BEFORE_AFTER_PAIRS.length > 0
              ? "Deslizá el divisor para comparar la transformación del terreno."
              : "Seguimiento ordenado desde el inicio hasta la finalización de cada proyecto."}
          </p>
        </motion.div>

        {BEFORE_AFTER_PAIRS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BEFORE_AFTER_PAIRS.map((pair) => (
              <DraggableBeforeAfter key={pair.id} {...pair} />
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-2 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
            {stageCards.map((item, idx) => (
              <motion.article
                key={item.stage}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                className="w-[78vw] sm:w-[50vw] md:w-auto shrink-0 snap-start bg-white rounded-lg overflow-hidden border border-black/10 shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-eg-black">
                  <Image
                    src={item.project.images[0]}
                    alt={`${item.stage} — ${item.project.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 78vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-eg-black/80 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-white font-display text-xs font-bold uppercase tracking-[0.1em]">
                    <ChevronRight className="w-4 h-4 text-eg-gold" strokeWidth={3} />
                    <span>{item.stage}</span>
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-condensed font-bold uppercase text-xl text-eg-black mb-1">
                    {item.project.title}
                  </h3>
                  <p className="text-sm text-eg-lightText leading-relaxed">{item.caption}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
