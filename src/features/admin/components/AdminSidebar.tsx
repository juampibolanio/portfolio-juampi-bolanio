"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFolder, FaCode, FaChartBar, FaSignOutAlt, FaUserShield } from "react-icons/fa";

const navLinks = [
  { name: "Panel General", href: "/admin", icon: FaChartBar },
  { name: "Proyectos", href: "/admin/proyectos", icon: FaFolder },
  { name: "Tecnologías", href: "/admin/tecnologias", icon: FaCode },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between backdrop-blur-xl z-20">
      <div className="flex flex-col gap-y-8">
        
        <div className="flex items-center gap-3 px-2 py-1">
          <FaUserShield className="text-primary text-2xl" />
          <span className="font-headline font-bold text-lg tracking-wider text-white">
            DevPanel
          </span>
        </div>

        <nav className="flex flex-col gap-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 font-semibold shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)]" // Estilos si está ACTIVO
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent" // Estilos si está INACTIVO
                }`}
              >
                <Icon size={16} className={isActive ? "text-primary" : "text-slate-500"} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-all border border-transparent hover:border-red-500/20"
      >
        <FaSignOutAlt size={16} />
        Volver al Home
      </Link>
    </aside>
  );
}
