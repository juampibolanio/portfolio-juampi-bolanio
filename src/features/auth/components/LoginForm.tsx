"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
  );
}
