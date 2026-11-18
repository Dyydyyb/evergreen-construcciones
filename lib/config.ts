export type WorkTypeId =
  | "Movimiento de suelos"
  | "Obra vial / pavimento"
  | "Obra civil"
  | "Infraestructura"
  | "Desarrollo / proyecto"
  | "Otro";

export const SITE_CONFIG = {
  brandName: "Evergreen Construcciones",
  shortMark: "EG",
  description: "Obras viales y civiles",
  category: "Constructora",
  address: "Avenida 38, La Plata, Buenos Aires (CP 1900)",
  city: "La Plata, Buenos Aires",
  ctaLabel: "Consultá por tu presupuesto",
  whatsappDisplay: "+54 9 221 621-8469",
  whatsappNumber: "5492216218469",
  whatsappBaseUrl: "https://wa.me/5492216218469",
  instagramHandle: "@evergreenconstrucciones",
  instagramUrl: "https://www.instagram.com/evergreenconstrucciones/",
  heroSlides: [
    {
      image: "/images/zanjeo-infraestructura.jpg",
      alt: "Excavadora ejecutando zanjeo y obra de infraestructura bajo cielo despejado",
    },
    {
      image: "/images/excavadora-suelos.jpg",
      alt: "Excavadora realizando movimiento de suelos y nivelación",
    },
    {
      image: "/images/finalizacion-suelos.jpg",
      alt: "Finalización de obra de movimiento de suelos con terreno nivelado",
    },
    {
      image: "/images/acceso-vehicular.jpg",
      alt: "Finalización de obra de acceso vehicular y pavimentación",
    },
  ],
  closingImage: "/images/excavadora-suelos.jpg",
  closingImageAlt: "Maquinaria de Evergreen Construcciones en obra",
} as const;

export function buildWhatsAppUrl(message?: string): string {
  if (!message) return SITE_CONFIG.whatsappBaseUrl;
  return `${SITE_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Obras", href: "#obras" },
  { label: "Maquinaria", href: "#maquinaria" },
  { label: "Proceso", href: "#proceso" },
  { label: "Presupuesto", href: "#presupuesto" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const WORK_LINES = [
  {
    id: "VIAL",
    label: "VIAL",
    description: "Pavimentación, accesos vehiculares y compactación.",
    targetCategory: "Obras viales" as const,
  },
  {
    id: "CIVIL",
    label: "CIVIL",
    description: "Construcciones, bases, plateas y edificaciones.",
    targetCategory: "Obras civiles" as const,
  },
  {
    id: "DESARROLLOS",
    label: "DESARROLLOS",
    description: "Infraestructura integral para complejos y loteos.",
    targetCategory: "Desarrollos" as const,
  },
];

export interface ServiceItem {
  id: WorkTypeId;
  title: string;
  description: string;
  image: string;
  iconName: "shovel" | "route" | "building" | "pipette" | "compass";
}

export const SERVICES: ServiceItem[] = [
  {
    id: "Movimiento de suelos",
    title: "Movimiento de suelos",
    description: "Nivelación de terrenos, excavaciones, desmontes y zanjeo.",
    image: "/images/excavadora-suelos.jpg",
    iconName: "shovel",
  },
  {
    id: "Infraestructura",
    title: "Obras de infraestructura",
    description: "Tendido de conductos, desagües pluviales y preparación de redes.",
    image: "/images/zanjeo-infraestructura.jpg",
    iconName: "pipette",
  },
  {
    id: "Obra vial / pavimento",
    title: "Obras viales",
    description: "Pavimentación, asfalto, compactación y accesos vehiculares.",
    image: "/images/acceso-vehicular.jpg",
    iconName: "route",
  },
  {
    id: "Obra civil",
    title: "Obras civiles",
    description: "Construcciones, bases, plateas industriales y edificaciones.",
    image: "/images/comedor-personal.jpg",
    iconName: "building",
  },
  {
    id: "Desarrollo / proyecto",
    title: "Desarrollos",
    description: "Ejecución integral de proyectos y complejos desde el inicio de obra.",
    image: "/images/inicio-complejo-turistico.jpg",
    iconName: "compass",
  },
];

export const MACHINERY = [
  {
    name: "Excavadora",
    role: "Excavaciones, zanjeo y movimiento de suelos de alto volumen.",
    image: "/images/zanjeo-infraestructura.jpg",
  },
  {
    name: "Excavadora sobre orugas",
    role: "Nivelación, carga y apertura de trazas en obra urbana y vial.",
    image: "/images/excavadora-suelos.jpg",
  },
  {
    name: "Minicargadora",
    role: "Movimiento ágil de áridos, nivelación fina y preparación de terreno.",
    image: "/images/inicio-complejo-turistico.jpg",
  },
  {
    name: "Equipo en obra urbana",
    role: "Intervenciones viales y de infraestructura con seguridad perimetral.",
    image: "/images/excavadora-urbana.jpg",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Seriedad en obra",
    description: "Planificación ordenada y ejecución prolija en cada etapa.",
    iconName: "shieldCheck" as const,
    // TODO: Completar con métrica real verificada si desean mostrar indicador numérico
    metricPlaceholder: null as number | null,
  },
  {
    title: "Cumplimiento de plazos",
    description: "Cronogramas claros desde el inicio hasta la finalización.",
    iconName: "clock" as const,
    metricPlaceholder: null as number | null,
  },
  {
    title: "Maquinaria en obra",
    description: "Equipos preparados para suelos, zanjeo y pavimentación.",
    iconName: "truck" as const,
    metricPlaceholder: null as number | null,
  },
  {
    title: "Presupuesto claro",
    description: "Detalle transparente de tareas, etapas y alcance del proyecto.",
    iconName: "fileCheck" as const,
    metricPlaceholder: null as number | null,
  },
];

export const WORK_PROCESS = [
  {
    step: 1,
    title: "Consulta",
    description: "Nos contás el tipo de obra, la ubicación y tus necesidades.",
    iconName: "messageSquare" as const,
  },
  {
    step: 2,
    title: "Relevamiento y presupuesto",
    description: "Evaluamos el terreno o proyecto y te pasamos un presupuesto claro.",
    iconName: "clipboardList" as const,
  },
  {
    step: 3,
    title: "Ejecución de obra",
    description: "Desplegamos equipos y personal técnico cumpliendo cada etapa.",
    iconName: "hardHat" as const,
  },
  {
    step: 4,
    title: "Entrega y finalización",
    description: "Verificamos terminaciones y entregamos la obra lista para operar.",
    iconName: "flag" as const,
  },
];
