"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import { REVIEWS } from "@/lib/reviews";

export function ReviewsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: REVIEWS.length > 2, align: "start" },
    shouldReduceMotion
      ? []
      : [Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Ocultar la sección completa si no hay reseñas reales cargadas
  if (REVIEWS.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-eg-black text-white border-t border-eg-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="font-condensed font-extrabold uppercase text-white leading-none tracking-[0.02em] mb-8"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
        >
          Opiniones de clientes
        </h2>

        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
              >
                <article className="h-full bg-eg-carbon border border-eg-graphite rounded-lg p-5 sm:p-6 flex flex-col justify-between">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
                    “{review.text}”
                  </p>
                  <div className="pt-3 border-t border-eg-graphite">
                    <p className="font-condensed font-bold uppercase text-lg text-eg-gold">
                      {review.author}
                    </p>
                    {review.role && (
                      <p className="text-xs text-white/65">{review.role}</p>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {scrollSnaps.map((_, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Ver opinión ${idx + 1}`}
                  className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      active ? "w-7 bg-eg-gold" : "w-2 bg-white/30"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
