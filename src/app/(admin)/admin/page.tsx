import MetricCards from "@/features/admin/components/MetricCards";
import RecentProjectsTable from "@/features/admin/components/RecentProjectsTable";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            ¡Hola, Juan Pablo!
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Este es tu centro de operaciones. Aquí controlas las métricas y contenidos de tu portfolio.
          </p>
        </div>
        
        <Link 
          href="/admin/proyectos/nuevo-proyecto" 
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-background font-bold rounded-xl text-sm transition-all shadow-lg shadow-primary/20"
        >
          <FaPlus size={12} />
          Nuevo Proyecto
        </Link>
      </div>

      <MetricCards />

      <div className="grid grid-cols-1 gap-6">
        <RecentProjectsTable />
      </div>
    </div>
  );
}
