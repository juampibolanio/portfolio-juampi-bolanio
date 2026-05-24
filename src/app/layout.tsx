import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Juan Pablo | Portfolio",
  description: "Portfolio de Juan Pablo, Desarrollador Full Stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body 
        className={`${inter.variable} ${manrope.variable} font-body bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary/30`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}