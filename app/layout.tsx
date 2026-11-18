import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Evergreen Construcciones (EG) | Obras viales y civiles en La Plata",
  description:
    "Constructora de obras viales, civiles, movimiento de suelos, infraestructura y desarrollos en La Plata, Buenos Aires. Consultá por tu presupuesto.",
  keywords: [
    "movimiento de suelos La Plata",
    "obras viales La Plata",
    "constructora La Plata",
    "obras de infraestructura",
    "pavimentación",
    "Evergreen Construcciones",
  ],
  openGraph: {
    title: "Evergreen Construcciones | Obras viales y civiles en La Plata",
    description:
      "Construimos las bases de tu próximo proyecto. Movimiento de suelos, obras viales, civiles e infraestructura en La Plata.",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.heroSlides[0].image,
        width: 1200,
        height: 900,
        alt: SITE_CONFIG.heroSlides[0].alt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE_CONFIG.brandName,
    description: SITE_CONFIG.description,
    telephone: "+54 9 221 621-8469",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida 38",
      addressLocality: "La Plata",
      addressRegion: "Buenos Aires",
      postalCode: "1900",
      addressCountry: "AR",
    },
    areaServed: "La Plata y alrededores, Buenos Aires, Argentina",
    sameAs: [SITE_CONFIG.instagramUrl],
  };

  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-eg-black text-white font-sans antialiased pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
