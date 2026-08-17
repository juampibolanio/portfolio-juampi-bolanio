"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Verificando credenciales...");

    try {
      const token = btoa(`${username}:${password}`);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/check`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${token}`
        }
      });

      if (res.ok) {
        document.cookie = `portfolio_admin_auth=${token}; path=/; max-age=86400; SameSite=Strict`;
        toast.success("Acceso concedido", { id: toastId });
        router.push("/admin/proyectos");
      } else {
        toast.error("Usuario o contraseña incorrectos", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión con el servidor", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
      {/* Efectos de fondo sutiles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-headline font-extrabold text-white tracking-tight mb-2">
            Panel de Control
          </h1>
          <p className="text-slate-400 text-sm">
            Ingresa tus credenciales para administrar el portfolio.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-slate-300 text-sm font-bold block mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-4 bg-slate-950 text-white rounded-xl border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="admin..."
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm font-bold block mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 bg-slate-950 text-white rounded-xl border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-primary text-slate-950 font-bold py-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            {isLoading ? "Verificando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </main>
  );
}
