import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // backgrounds
        "background": "#131313",      // Fondo principal oscuro de toda la web
        "surface": "#201f1f",         // Fondo un poco más claro para tarjetas
        "surface-hover": "#2a2a2a",   // Fondo para cuando pasas el mouse por una tarjeta

        // 2. COLORES DE MARCA (Acentos)
        "primary": "#adc6ff",         // Tu azul/celeste base
        "secondary": "#d0bcff",       // Tu morado base

        // 3. TEXTOS Y BORDES ESPECÍFICOS
        "text-main": "#e5e2e1",       // Blanco apagado para textos principales
        "text-muted": "#8c909f",      // Gris para descripciones (aunque podés usar text-neutral-400)
        "border-subtle": "#424754",   // Líneas y bordes sutiles
      },
      fontFamily: {
        headline: ["var(--font-manrope)"],
        body: ["var(--font-inter)"],
      }
    },
  },
  plugins: [],
};

export default config;