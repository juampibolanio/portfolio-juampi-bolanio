"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import { projectService } from "@/features/projects/services/projects.service";
import { Project } from "@/features/projects/interfaces/project.interface";
import toast from "react-hot-toast";

export default function ProjectsCrudPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      toast.error("Error al cargar los proyectos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (uuid: string, title: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el proyecto "${title}"? Esta acción no se puede deshacer.`);
    
    if (!confirmDelete) return;

    try {
      await projectService.delete(uuid);
      toast.success("Proyecto eliminado correctamente");
      setProjects(projects.filter(p => p.uuid !== uuid));
    } catch (error) {
      toast.error("Hubo un error al eliminar el proyecto");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Gestión de Proyectos</h1>
          <p className="text-slate-400 text-sm mt-1">Administra los proyectos que se muestran en tu portfolio.</p>
        </div>
        <Link 
          href="/admin/proyectos/nuevo-proyecto" 
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-background font-bold rounded-xl text-sm transition-all shadow-lg shadow-primary/20"
        >
          <FaPlus size={12} />
          Nuevo Proyecto
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs uppercase font-bold tracking-wider">
                <th className="p-4 pl-6">Título</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Tecnologías</th>
                <th className="p-4 text-right pr-6">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">Cargando proyectos...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">No hay proyectos registrados. ¡Crea el primero!</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.uuid} className="hover:bg-white/[0.01] transition-colors">
                    
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-white">{project.title}</div>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                          Ver web <FaExternalLinkAlt size={10} />
                        </a>
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        project.featured ? "bg-primary/10 text-primary border border-primary/20" : "bg-slate-800 text-slate-400"
                      }`}>
                        {project.featured ? "Destacado" : "Estándar"}
                      </span>
                    </td>

                    <td className="p-4 text-slate-400">
                      {project.technologies?.length || 0} etiquetas
                    </td>

                    <td className="p-4 text-right pr-6">
                      <div className="flex gap-2 justify-end">
                        <Link 
                          href={`/admin/proyectos/editar/${project.uuid}`}
                          className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors" 
                          title="Editar"
                        >
                          <FaEdit size={14} />
                        </Link>
                        
                        <button 
                          onClick={() => handleDelete(project.uuid, project.title)}
                          className="p-2 bg-slate-800 text-red-400 hover:bg-red-500/10 rounded-lg border border-slate-700 transition-colors" 
                          title="Eliminar"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
