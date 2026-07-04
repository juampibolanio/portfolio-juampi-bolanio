
import React from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 font-body text-slate-100 antialiased">
      
      <AdminSidebar />

      <div className="flex-1 pl-64 flex flex-col">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950/80 sticky top-0 backdrop-blur-md z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 font-medium">
              Juan Pablo (Owner)
            </span>
          </div>
        </header>

        <main className="grow p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
