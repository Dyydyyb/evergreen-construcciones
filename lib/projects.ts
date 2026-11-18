import type { WorkTypeId } from "./config";

export type ProjectCategory =
  | "Todas"
  | "Movimiento de suelos"
  | "Obras viales"
  | "Obras civiles"
  | "Desarrollos";

export type ProjectStage = "INICIO DE OBRA" | "OBRA EN CURSO" | "FINALIZACIÓN DE OBRA";

export interface ProjectItem {
  id: string;
  images: string[];
  title: string;
  category: Exclude<ProjectCategory, "Todas">;
  workTypeId: WorkTypeId;
  stage?: ProjectStage;
  description: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Todas",
  "Movimiento de suelos",
  "Obras viales",
  "Obras civiles",
  "Desarrollos",
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "finalizacion-movimiento-suelos",
    images: ["/images/finalizacion-suelos.jpg"],
    title: "Movimiento de suelos y nivelación de predio",
    category: "Movimiento de suelos",
    workTypeId: "Movimiento de suelos",
    stage: "FINALIZACIÓN DE OBRA",
    description: "Nivelación general de terreno y preparación de superficie.",
  },
  {
    id: "zanjeo-pluvial-infraestructura",
    images: ["/images/zanjeo-infraestructura.jpg"],
    title: "Zanjeo y tendido de conductos",
    category: "Movimiento de suelos",
    workTypeId: "Infraestructura",
    stage: "OBRA EN CURSO",
    description: "Excavación con maquinaria y colocación de cañería pluvial.",
  },
  {
    id: "acceso-vehicular",
    images: ["/images/acceso-vehicular.jpg"],
    title: "Acceso vehicular y garita de control",
    category: "Obras viales",
    workTypeId: "Obra vial / pavimento",
    stage: "FINALIZACIÓN DE OBRA",
    description: "Pavimentación de acceso vehicular, veredas y módulo de control.",
  },
  {
    id: "obra-vial-urbana",
    images: ["/images/excavadora-urbana.jpg"],
    title: "Intervención vial en sector urbano",
    category: "Obras viales",
    workTypeId: "Obra vial / pavimento",
    stage: "OBRA EN CURSO",
    description: "Movimiento de suelos y acondicionamiento de calzada y vereda.",
  },
  {
    id: "comedor-personal",
    images: ["/images/comedor-personal.jpg"],
    title: "Comedor para personal",
    category: "Obras civiles",
    workTypeId: "Obra civil",
    stage: "FINALIZACIÓN DE OBRA",
    description: "Edificación civil completa con vereda perimetral y cerramientos.",
  },
  {
    id: "proyecto-complejo-turistico",
    images: ["/images/inicio-complejo-turistico.jpg"],
    title: "Proyecto complejo turístico",
    category: "Desarrollos",
    workTypeId: "Desarrollo / proyecto",
    stage: "INICIO DE OBRA",
    description: "Apertura de obra y movimiento de suelos inicial con minicargadora.",
  },
];

// Pares antes/después opcionales (dejar vacío si no hay pares comparativos del mismo ángulo)
export interface BeforeAfterPair {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
}

export const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = [];
