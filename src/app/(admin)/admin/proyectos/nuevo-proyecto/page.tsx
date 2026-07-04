import CreateProjectForm from "@/features/projects/components/CreateProjectForm";

export default function AdminPage() {
  return (
    <section className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-3xl mx-auto p-8 mt-10 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">

        <header className="mb-6 border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold text-white">
            Cargar Nuevo Proyecto
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Completa los datos para añadir un nuevo proyecto a tu portfolio.
          </p>
        </header>

        <CreateProjectForm />

      </div>
    </section>
  );
}
