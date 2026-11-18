export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  text: string;
}

// Arreglo vacío: la sección de opiniones se oculta automáticamente hasta cargar reseñas reales verificadas.
export const REVIEWS: ReviewItem[] = [];
