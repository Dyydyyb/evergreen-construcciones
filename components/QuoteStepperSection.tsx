"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Shovel,
  Route,
  Building2,
  Wrench,
  Compass,
  Layers,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { buildWhatsAppUrl, type WorkTypeId } from "@/lib/config";

const quoteSchema = z.object({
  tipoObra: z.enum([
    "Movimiento de suelos",
    "Obra vial / pavimento",
    "Obra civil",
    "Infraestructura",
    "Desarrollo / proyecto",
    "Otro",
  ]),
  superficie: z.string().max(80).optional(),
  terreno: z.enum([
    "Terreno a nivelar",
    "Acceso o camino",
    "Obra nueva",
    "Ampliación",
    "No sé",
  ]),
  planos: z.enum(["Sí", "No", "Necesito asesoramiento"]),
  nombre: z.string().min(2, "Ingresá tu nombre o empresa"),
  zona: z.string().min(2, "Indicá la localidad o zona"),
  urgencia: z.enum(["Lo antes posible", "En 1 a 3 meses", "Estoy averiguando"]),
  comentarios: z.string().max(400).optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const WORK_OPTIONS: { id: WorkTypeId; label: string; icon: React.ElementType }[] = [
  { id: "Movimiento de suelos", label: "Movimiento de suelos", icon: Shovel },
  { id: "Obra vial / pavimento", label: "Obra vial / pavimento", icon: Route },
  { id: "Obra civil", label: "Obra civil", icon: Building2 },
  { id: "Infraestructura", label: "Infraestructura", icon: Wrench },
  { id: "Desarrollo / proyecto", label: "Desarrollo / proyecto", icon: Compass },
  { id: "Otro", label: "Otro", icon: Layers },
];

const TERRENO_OPTIONS: QuoteFormValues["terreno"][] = [
  "Terreno a nivelar",
  "Acceso o camino",
  "Obra nueva",
  "Ampliación",
  "No sé",
];

const PLANOS_OPTIONS: QuoteFormValues["planos"][] = [
  "Sí",
  "No",
  "Necesito asesoramiento",
];

const URGENCIA_OPTIONS: QuoteFormValues["urgencia"][] = [
  "Lo antes posible",
  "En 1 a 3 meses",
  "Estoy averiguando",
];

function generateMessage(v: Partial<QuoteFormValues>): string {
  const nombre = v.nombre?.trim() || "[Nombre]";
  const zona = v.zona?.trim() || "[Zona]";
  const tipo = v.tipoObra || "una obra";
  const supPart = v.superficie?.trim() ? ` Superficie aprox.: ${v.superficie.trim()}.` : "";
  const sitPart = ` Situación: ${v.terreno || "A definir"}.`;
  const planosPart =
    v.planos === "Sí"
      ? " Cuento con planos/proyecto."
      : v.planos === "No"
      ? " Sin planos aún."
      : " Necesito asesoramiento técnico.";
  const urgPart = ` Necesito comenzar ${v.urgencia?.toLowerCase() || "lo antes posible"}.`;
  const comPart = v.comentarios?.trim() ? ` Comentarios: ${v.comentarios.trim()}.` : "";

  return `Hola Evergreen Construcciones! Soy ${nombre}, de ${zona}. Quiero consultar por ${tipo}.${supPart}${sitPart}${planosPart}${urgPart}${comPart} ¿Me pueden asesorar y pasar un presupuesto? Gracias!`;
}

interface QuoteStepperSectionProps {
  selectedWorkType?: WorkTypeId;
}

export function QuoteStepperSection({ selectedWorkType }: QuoteStepperSectionProps) {
  const [step, setStep] = useState(1);
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      tipoObra: selectedWorkType || "Movimiento de suelos",
      superficie: "",
      terreno: "Terreno a nivelar",
      planos: "Necesito asesoramiento",
      nombre: "",
      zona: "",
      urgencia: "En 1 a 3 meses",
      comentarios: "",
    },
  });

  const values = watch();

  useEffect(() => {
    if (selectedWorkType) {
      setValue("tipoObra", selectedWorkType);
    }
  }, [selectedWorkType, setValue]);

  useEffect(() => {
    if (step === 4) {
      setCustomMessage(generateMessage(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleNext = async () => {
    if (step === 3) {
      const ok = await trigger(["nombre", "zona"]);
      if (!ok) return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const handleCopy = async () => {
    const text = customMessage || generateMessage(values);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked
    }
  };

  const progress = (step / 4) * 100;

  return (
    <section id="presupuesto" className="py-10 sm:py-16 lg:py-20 bg-eg-carbon text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <h2
            className="font-condensed font-extrabold uppercase text-white leading-none tracking-[0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Armá tu consulta
          </h2>
          <p className="text-sm sm:text-base text-white/75 mt-2">
            Completá los datos de tu obra y enviá el detalle directo por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Stepper Card */}
          <div className="lg:col-span-8 bg-eg-black border border-eg-graphite rounded-lg p-5 sm:p-8 shadow-industrial">
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-display font-semibold uppercase tracking-[0.12em] text-white/75 mb-2">
                <span>Paso {step} de 4</span>
                <span className="text-eg-gold tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-eg-graphite rounded overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                  className="h-full bg-eg-gold"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-condensed font-bold uppercase text-2xl text-white mb-4">
                    ¿Qué tipo de obra necesitás?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {WORK_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const active = values.tipoObra === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setValue("tipoObra", opt.id)}
                          aria-pressed={active}
                          className={`p-3.5 sm:p-4 min-h-[82px] rounded border text-left transition-all flex flex-col justify-between gap-2 ${
                            active
                              ? "border-eg-gold bg-eg-gold/15 text-white"
                              : "border-eg-graphite bg-eg-carbon hover:border-white/40 text-white/80"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${active ? "text-eg-gold" : "text-white/70"}`}
                            strokeWidth={1.75}
                          />
                          <span className="font-display text-xs sm:text-sm font-semibold leading-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-condensed font-bold uppercase text-2xl text-white">
                    Detalles de la obra
                  </h3>

                  <div>
                    <label
                      htmlFor="input-superficie"
                      className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5"
                    >
                      Superficie o dimensión aproximada (opcional)
                    </label>
                    <input
                      id="input-superficie"
                      type="text"
                      placeholder="Ej: 450 m² o 120 metros lineales"
                      {...register("superficie")}
                      className="w-full min-h-[44px] rounded border border-eg-graphite bg-eg-carbon px-3.5 py-2 text-sm text-white placeholder:text-white/45"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5">
                      Situación o tipo de terreno
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TERRENO_OPTIONS.map((t) => {
                        const active = values.terreno === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setValue("terreno", t)}
                            aria-pressed={active}
                            className={`min-h-[44px] px-3 py-2 rounded border text-xs font-semibold transition-colors ${
                              active
                                ? "bg-eg-gold text-eg-black border-eg-gold"
                                : "bg-eg-carbon text-white/80 border-eg-graphite"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5">
                      ¿Tenés planos o proyecto?
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {PLANOS_OPTIONS.map((pl) => {
                        const active = values.planos === pl;
                        return (
                          <button
                            key={pl}
                            type="button"
                            onClick={() => setValue("planos", pl)}
                            aria-pressed={active}
                            className={`min-h-[44px] px-2 py-2 rounded border text-xs font-semibold transition-colors ${
                              active
                                ? "bg-eg-gold text-eg-black border-eg-gold"
                                : "bg-eg-carbon text-white/80 border-eg-graphite"
                            }`}
                          >
                            {pl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-condensed font-bold uppercase text-2xl text-white">
                    Datos de contacto
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="eg-nombre"
                        className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5"
                      >
                        Nombre o empresa *
                      </label>
                      <input
                        id="eg-nombre"
                        type="text"
                        placeholder="Ej: Estudio Sur / Martín"
                        {...register("nombre")}
                        className="w-full min-h-[44px] rounded border border-eg-graphite bg-eg-carbon px-3.5 py-2 text-sm text-white placeholder:text-white/45"
                      />
                      {errors.nombre && (
                        <p className="text-xs text-eg-gold mt-1 font-medium">
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="eg-zona"
                        className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5"
                      >
                        Localidad o zona de la obra *
                      </label>
                      <input
                        id="eg-zona"
                        type="text"
                        placeholder="Ej: La Plata / City Bell"
                        {...register("zona")}
                        className="w-full min-h-[44px] rounded border border-eg-graphite bg-eg-carbon px-3.5 py-2 text-sm text-white placeholder:text-white/45"
                      />
                      {errors.zona && (
                        <p className="text-xs text-eg-gold mt-1 font-medium">
                          {errors.zona.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5">
                      Plazo estimado de inicio
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {URGENCIA_OPTIONS.map((u) => {
                        const active = values.urgencia === u;
                        return (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setValue("urgencia", u)}
                            aria-pressed={active}
                            className={`min-h-[44px] px-3 py-2 rounded border text-xs font-semibold transition-colors ${
                              active
                                ? "bg-eg-gold text-eg-black border-eg-gold"
                                : "bg-eg-carbon text-white/80 border-eg-graphite"
                            }`}
                          >
                            {u}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="eg-comentarios"
                      className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-white/80 mb-1.5"
                    >
                      Comentarios opcionales
                    </label>
                    <textarea
                      id="eg-comentarios"
                      rows={2}
                      placeholder="Detalles de acceso, suelo o consultas..."
                      {...register("comentarios")}
                      className="w-full rounded border border-eg-graphite bg-eg-carbon px-3.5 py-2 text-sm text-white placeholder:text-white/45"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-condensed font-bold uppercase text-2xl text-white">
                    Vista previa del mensaje
                  </h3>
                  <p className="text-sm text-white/75">
                    Podés editar el texto antes de enviarlo por WhatsApp.
                  </p>

                  <label htmlFor="eg-preview" className="sr-only">
                    Mensaje para WhatsApp
                  </label>
                  <textarea
                    id="eg-preview"
                    rows={5}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full rounded border border-eg-gold/50 bg-eg-carbon p-4 text-sm text-white leading-relaxed"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <a
                      href={buildWhatsAppUrl(customMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[48px] rounded bg-eg-whatsapp hover:bg-eg-whatsappDark text-eg-black font-bold text-sm px-6 py-3 inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" strokeWidth={2} />
                      <span>Enviar por WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="min-h-[48px] rounded border border-eg-graphite hover:border-eg-gold text-white font-semibold text-sm px-5 py-3 inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-eg-gold" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? "¡Mensaje copiado!" : "Copiar mensaje"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 pt-5 border-t border-eg-graphite flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="min-h-[44px] px-4 py-2 rounded border border-eg-graphite hover:border-white text-white/80 font-display text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
              ) : (
                <span className="text-xs text-white/65">
                  Atención directa en La Plata y alrededores
                </span>
              )}

              {step < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[44px] px-6 py-2.5 rounded bg-eg-gold hover:bg-eg-goldHover text-eg-black font-display text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center gap-1.5 ml-auto transition-colors"
                >
                  <span>{step === 3 ? "Ver mensaje" : "Siguiente"}</span>
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Live Summary */}
          <aside className="hidden lg:block lg:col-span-4 bg-eg-black border border-eg-graphite rounded-lg p-6 shadow-industrial sticky top-24">
            <h3 className="font-condensed font-bold uppercase text-2xl text-eg-gold mb-4">
              Resumen de consulta
            </h3>

            <dl className="space-y-3 text-sm border-t border-eg-graphite pt-4">
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Tipo de obra</dt>
                <dd className="font-semibold text-right">{values.tipoObra}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Superficie</dt>
                <dd className="text-right">{values.superficie?.trim() || "A definir"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Situación</dt>
                <dd className="text-right">{values.terreno}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Planos</dt>
                <dd className="text-right">{values.planos}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Inicio</dt>
                <dd className="text-right">{values.urgencia}</dd>
              </div>
              {(values.nombre || values.zona) && (
                <div className="flex justify-between gap-3 pt-2 border-t border-eg-graphite">
                  <dt className="text-white/65">Contacto</dt>
                  <dd className="text-right">
                    {[values.nombre, values.zona].filter(Boolean).join(" · ")}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
