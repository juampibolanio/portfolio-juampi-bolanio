import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import TanStackQueryProvider from "@/common/providers/TanStackQueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Juan Pablo | Portfolio",
  description: "Portfolio de Juan Pablo, Desarrollador Backend",
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
          {children}
          
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
                iconTheme: { primary: '#22d3ee', secondary: '#1e293b' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              }
            }}
          />
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
