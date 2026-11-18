"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectItem,
} from "@/lib/projects";
import type { WorkTypeId } from "@/lib/config";

interface ProjectsGalleryProps {
  activeCategory: ProjectCategory;
  onChangeCategory: (cat: ProjectCategory) => void;
  onSelectWorkType: (id: WorkTypeId) => void;
}

export function ProjectsGallery({
  activeCategory,
  onChangeCategory,
  onSelectWorkType,
}: ProjectsGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "Todas"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: filteredProjects.length > 2,
      align: "start",
    },
    shouldReduceMotion
      ? []
      : [Autoplay({ delay: 4800, stopOnInteraction: true, stopOnMouseEnter: true })]
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
  }, [emblaApi, onSelect, activeCategory]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [activeCategory, emblaApi]);

  useEffect(() => {
    if (!lightboxProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxProject(null);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const navigateLightbox = (dir: number) => {
    if (!lightboxProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === lightboxProject.id);
    if (idx === -1) return;
    const nextIdx = (idx + dir + filteredProjects.length) % filteredProjects.length;
    setLightboxProject(filteredProjects[nextIdx]);
  };

  return (
    <section id="obras" className="py-10 sm:py-16 lg:py-20 bg-eg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 sm:mb-10">
          <h2
            className="font-condensed font-extrabold uppercase text-white leading-none tracking-[0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Obras realizadas
          </h2>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Obra anterior"
              className="w-11 h-11 rounded border border-eg-graphite bg-eg-carbon hover:border-eg-gold text-white hover:text-eg-gold flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Siguiente obra"
              className="w-11 h-11 rounded border border-eg-graphite bg-eg-carbon hover:border-eg-gold text-white hover:text-eg-gold flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8"
          role="tablist"
          aria-label="Filtrar obras por categoría"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChangeCategory(category)}
                className={`relative px-4 py-2 min-h-[44px] rounded font-display text-xs font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-eg-black"
                    : "text-white/80 bg-eg-carbon border border-eg-graphite hover:border-eg-gold"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="egActiveFilter"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded bg-eg-gold"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 py-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isDimmed = hoveredId !== null && hoveredId !== project.id;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: isDimmed ? 0.6 : 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.28 }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex-[0_0_76%] sm:flex-[0_0_54%] md:flex-[0_0_46%] lg:flex-[0_0_32%] min-w-0"
                  >
                    <article className="group relative bg-eg-carbon border border-eg-graphite rounded-lg overflow-hidden shadow-industrial transition-all duration-300 md:hover:-translate-y-3 md:hover:scale-[1.03] md:hover:shadow-industrialHover md:hover:border-eg-gold/60">
                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        aria-label={`Ampliar foto: ${project.title}`}
                        className="relative block w-full aspect-[4/3] overflow-hidden bg-eg-black text-left"
                      >
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 76vw, (max-width: 1024px) 48vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-eg-black/90 via-eg-black/30 to-transparent md:opacity-60 md:group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        />

                        {project.stage && (
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-eg-black/85 border border-eg-gold/40 text-white font-display text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded">
                            <ChevronRight className="w-3.5 h-3.5 text-eg-gold" strokeWidth={3} />
                            <span>{project.stage}</span>
                          </span>
                        )}

                        <span className="absolute top-3 right-3 w-9 h-9 rounded bg-eg-black/75 text-white flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <Expand className="w-4 h-4" />
                        </span>

                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-eg-gold block mb-1">
                            {project.category}
                          </span>
                          <h3 className="font-condensed font-bold uppercase text-xl leading-tight text-white">
                            {project.title}
                          </h3>
                        </div>
                      </button>

                      <div className="p-4 flex items-center justify-between gap-3 border-t border-eg-graphite">
                        <p className="text-xs sm:text-sm text-white/75 line-clamp-1">
                          {project.description}
                        </p>
                        <a
                          href="#presupuesto"
                          onClick={() => onSelectWorkType(project.workTypeId)}
                          className="shrink-0 inline-flex items-center gap-1 text-xs font-display font-bold uppercase tracking-[0.08em] text-eg-gold hover:text-white min-h-[44px] px-2"
                        >
                          <span>Quiero una obra así</span>
                          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                        </a>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Animated Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {scrollSnaps.map((_, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Ir al grupo de obras ${idx + 1}`}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-eg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxProject.title}
            onClick={() => setLightboxProject(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-eg-carbon border border-eg-graphite rounded-lg overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxProject(null)}
                aria-label="Cerrar vista ampliada"
                className="absolute top-3 right-3 z-20 w-11 h-11 rounded bg-eg-black/80 text-white hover:text-eg-gold flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-eg-black">
                <Image
                  src={lightboxProject.images[0]}
                  alt={lightboxProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => navigateLightbox(-1)}
                  aria-label="Obra anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded bg-eg-black/80 text-white hover:text-eg-gold flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateLightbox(1)}
                  aria-label="Siguiente obra"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded bg-eg-black/80 text-white hover:text-eg-gold flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-eg-graphite">
                <div>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-eg-gold">
                    {lightboxProject.category}
                  </span>
                  <h3 className="font-condensed font-bold uppercase text-2xl text-white mt-0.5">
                    {lightboxProject.title}
                  </h3>
                  <p className="text-sm text-white/75 mt-1">
                    {lightboxProject.description}
                  </p>
                </div>

                <a
                  href="#presupuesto"
                  onClick={() => {
                    onSelectWorkType(lightboxProject.workTypeId);
                    setLightboxProject(null);
                  }}
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-eg-gold hover:bg-eg-goldHover text-eg-black font-display text-xs font-bold uppercase tracking-[0.1em] px-5 py-3 min-h-[44px] rounded transition-colors"
                >
                  <span>Quiero una obra así</span>
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
