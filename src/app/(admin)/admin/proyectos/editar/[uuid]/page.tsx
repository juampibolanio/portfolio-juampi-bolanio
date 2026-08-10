import EditProjectForm from "@/features/projects/components/EditProjectForm";

interface EditProjectPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { uuid } = await params;

  return (
    <div className="max-w-4xl mx-auto p-8 mt-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-4">
        Editar Proyecto
      </h1>
      <EditProjectForm uuid={uuid} />
    </div>
  );
}