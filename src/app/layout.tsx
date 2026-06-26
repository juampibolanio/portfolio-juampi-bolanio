import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/common/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/common/components/Footer";
import TanStackQueryProvider from "@/common/providers/TanStackQueryProvider";

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
    <html lang="es" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${manrope.variable} font-body bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary/30`}
      >
        <TanStackQueryProvider>
          <Navbar />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{

              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#22d3ee',
                  secondary: '#1e293b',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              }
            }}
          />
          <Footer />
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
