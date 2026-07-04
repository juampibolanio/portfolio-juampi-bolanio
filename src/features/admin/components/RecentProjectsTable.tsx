import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function RecentProjectsTable() {
  const recentProjects = [
    { id: 1, title: "NextShop E-Commerce", slug: "nextshop-e-commerce", status: "Destacado", views: "450" },
    { id: 2, title: "TaskMaster Kanban", slug: "taskmaster-kanban", status: "Destacado", views: "312" },
    { id: 3, title: "DevBlog Headless CMS", slug: "devblog-headless-cms", status: "Estándar", views: "120" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Vista Rápida de Proyectos</h3>
        <button className="text-xs font-bold text-primary hover:underline">Ver todos</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs uppercase font-bold tracking-wider">
              <th className="p-4 pl-6">Proyecto</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Visitas</th>
              <th className="p-4 text-right pr-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {recentProjects.map((project) => (
              <tr key={project.id} className="hover:bg-white/1 transition-colors">
                <td className="p-4 pl-6 font-semibold text-white">{project.title}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    project.status === "Destacado" ? "bg-primary/10 text-primary border border-primary/20" : "bg-slate-800 text-slate-400"
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4 text-slate-300 font-medium">{project.views}</td>
                <td className="p-4 text-right pr-6">
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors" title="Editar">
                      <FaEdit size={12} />
                    </button>
                    <button className="p-2 bg-slate-800 text-red-400 hover:bg-red-500/10 rounded-lg border border-slate-700 transition-colors" title="Eliminar">
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
