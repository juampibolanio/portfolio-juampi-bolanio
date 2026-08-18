import { projectService } from "@/features/projects/services/projects.service";
import ProjectGridCard from "@/features/projects/components/ProjectGridCard";
import Link from "next/link";
import { Project } from "@/features/projects/interfaces/project.interface";

export const metadata = {
  title: "Mis Proyectos | Portfolio",
  description: "Una selección de mis trabajos recientes y desarrollos profesionales.",
};

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await projectService.getAll();
  } catch (error) {
    projects = [];
  }

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <header className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-12">
          <div className="max-w-2xl">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
              Mis Proyectos
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed font-light max-w-xl">
              Una selección de mis trabajos recientes. Desarrollados con enfoque en el rendimiento, escalabilidad y experiencia de usuario.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-primary font-mono text-sm tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              / Catálogo Completo
            </span>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6">
        {projects.length === 0 ? (
          <div className="text-center py-32 bg-slate-900/50 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-lg">Actualmente no hay proyectos disponibles para mostrar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectGridCard key={project.uuid} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-slate-900 p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center rounded-3xl border border-slate-800 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-8 relative z-10 tracking-tighter">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 relative z-10 text-lg">
            Estoy disponible para nuevos desafíos. Construyamos la próxima solución tecnológica juntos.
          </p>
          <Link 
            href="/#contacto"
            className="relative z-10 bg-primary text-slate-950 px-10 py-4 font-bold text-lg rounded-xl transition-all hover:bg-primary/90 hover:-translate-y-1 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Hablemos
          </Link>
        </div>
      </section>
    </main>
  );
}
