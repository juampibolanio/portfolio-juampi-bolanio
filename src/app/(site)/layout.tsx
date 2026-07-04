import React from "react";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
