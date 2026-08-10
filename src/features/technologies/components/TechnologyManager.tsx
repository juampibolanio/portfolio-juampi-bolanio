"use client";

import { useState } from "react";
import { useTechnologies } from "../hooks/useTechnologies";
import { FaTrashAlt, FaCode } from "react-icons/fa";
import { IconMap } from "../utils/icon-map";

export default function TechnologiesManager() {
  const { technologies, isLoading, isSubmitting, handleCreate, handleDelete } = useTechnologies();
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate({ name, iconUrl }, () => {
      setName("");
      setIconUrl("");
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div className="lg:col-span-1">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl sticky top-24">
          <h2 className="text-xl font-bold text-white mb-6">Nueva Tecnología</h2>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-slate-300 text-sm font-bold block mb-1">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-bold block mb-1">Ícono (react-icons)</label>
              <input
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                required
                placeholder="Ej: SiReact"
                className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-primary hover:bg-primary/90 disabled:bg-slate-700 text-slate-950 disabled:text-slate-400 font-bold py-3 rounded-lg transition-all"
            >
              {isSubmitting ? "Guardando..." : "Agregar Tecnología"}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Catálogo Disponible</h2>
          {isLoading ? (
            <p className="text-slate-400">Cargando catálogo...</p>
          ) : technologies.length === 0 ? (
            <p className="text-slate-400">No hay tecnologías registradas en el sistema.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div key={tech.uuid} className="group flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-slate-500 transition-all">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-slate-300 shrink-0">
                      {IconMap && IconMap[tech.iconUrl] ? IconMap[tech.iconUrl] : <FaCode size={18} />}
                    </span>
                    <span className="text-sm font-semibold text-white truncate">
                      {tech.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(tech.uuid)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
