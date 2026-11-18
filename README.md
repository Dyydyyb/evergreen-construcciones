# Evergreen Construcciones (EG) — Landing Page

Landing page corporativa mobile-first construida con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Embla Carousel** y **React Hook Form + Zod**.

## Cómo editar contenido, imágenes y reseñas

1. **Datos de marca, WhatsApp y textos (`lib/config.ts`)**:
   - Teléfono y URL de WhatsApp (`whatsappDisplay`, `whatsappNumber`, `whatsappBaseUrl`)
   - Dirección, Instagram (`@evergreenconstrucciones`)
   - Fotos del Hero (`heroSlides`) y banner de cierre (`closingImage`)
   - Servicios, maquinaria, pilares y pasos de trabajo
2. **Obras y etapas (`lib/projects.ts`)**:
   - Guardá tus imágenes en `public/images/` y actualizá el arreglo `PROJECTS`.
   - Si agregás pares de fotos del mismo ángulo (antes y después), completá `BEFORE_AFTER_PAIRS` para habilitar el comparador interactivo.
3. **Reseñas (`lib/reviews.ts`)**:
   - Actualmente vacío (`REVIEWS = []`), por lo que la sección se mantiene oculta. Al agregar reseñas reales al arreglo, la sección aparece automáticamente.
4. **Logo**:
   - Logo original en `public/logo.png` e isotipo vectorial en `components/BrandMark.tsx`.

## Desarrollo y deploy

```bash
npm install
npm run dev
```

Listo para desplegar en **Vercel** importando el repositorio desde GitHub.
