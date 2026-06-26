"use client";

import { useCreateProject } from "@/features/projects/hooks/useCreateProject";

export default function CreateProjectForm() {
    const {
        setFile, isSubmitting, status, availableTechs,
        selectedTechs, isMainImage, setIsMainImage,
        toggleTech, handleSubmit
    } = useCreateProject();

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div>
                <label className="text-slate-300 text-sm font-bold block mb-1">Título del Proyecto *</label>
                <input name="title" required className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none" />
            </div>

            <div>
                <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Corta *</label>
                <input name="shortDescription" required maxLength={500} className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none" />
            </div>

            <div>
                <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Completa *</label>
                <textarea name="fullDescription" required rows={5} className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none" />
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="text-slate-300 text-sm font-bold block mb-1">GitHub URL</label>
                    <input name="githubUrl" type="url" placeholder="https://github.com/..." className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none" />
                </div>
                <div className="flex-1">
                    <label className="text-slate-300 text-sm font-bold block mb-1">Live URL (Demo)</label>
                    <input name="liveUrl" type="url" placeholder="https://..." className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none" />
                </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                <label className="text-slate-300 text-sm font-bold flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="featured" value="true" className="w-5 h-5 rounded text-blue-600 bg-slate-800" />
                    ¿Mostrar este proyecto como DESTACADO en el inicio?
                </label>
            </div>

            <div className="border-t border-slate-700 pt-6">
                <label className="text-slate-300 text-sm font-bold block mb-3">Tecnologías Utilizadas *</label>
                <div className="flex flex-wrap gap-2">
                    {availableTechs.length === 0 && <p className="text-sm text-slate-500 italic">Cargando tecnologías...</p>}
                    {availableTechs.map((tech) => (
                        <button
                            type="button"
                            key={tech.uuid}
                            onClick={() => toggleTech(tech.uuid)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${selectedTechs.includes(tech.uuid)
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'bg-slate-800 border-slate-600 text-slate-400'
                                }`}
                        >
                            {tech.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-slate-700 pt-6">
                <label className="text-slate-300 text-sm font-bold block mb-2">Imagen del Proyecto *</label>
                <input
                    type="file" accept="image/*" required
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full mb-4 p-2 text-slate-300 bg-slate-800 rounded border border-slate-700"
                />
                <label className="flex items-center gap-3 text-slate-300 text-sm font-bold cursor-pointer w-max">
                    <input
                        type="checkbox" checked={isMainImage} onChange={(e) => setIsMainImage(e.target.checked)}
                        className="w-5 h-5 rounded text-blue-600 bg-slate-800"
                    />
                    Esta es la imagen principal
                </label>
            </div>

            <div className="border-t border-slate-700 pt-6 mt-2">
                <button
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-lg font-bold py-4 rounded-lg transition-colors shadow-lg"
                >
                    {isSubmitting ? "Procesando y Subiendo..." : "Crear Proyecto"}
                </button>
                {status && (
                    <p className={`text-center mt-4 font-bold text-lg ${status.includes('éxito') ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {status}
                    </p>
                )}
            </div>
        </form>
    );
}
