import TechnologiesManager from "@/features/technologies/components/TechnologyManager";

export default function TechnologiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Tecnologías</h1>
          <p className="text-slate-400 text-sm mt-1">
            Administra las etiquetas que podrás asignar a tus futuros proyectos.
          </p>
        </div>
      </div>
      
      <TechnologiesManager />
    </div>
  );
}