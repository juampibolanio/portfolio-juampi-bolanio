"use client";

import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "portfolio_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    
    toast.success("Sesión cerrada correctamente", {
      icon: ':)',
      style: {
        background: '#0f172a',
        color: '#fff',
        border: '1px solid #1e293b'
      }
    });

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400 hover:text-slate-950 rounded-xl transition-all shadow-sm"
      title="Cerrar sesión segura"
    >
      <FaSignOutAlt size={16} />
      <span>Salir</span>
    </button>
  );
}