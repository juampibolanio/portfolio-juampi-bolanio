"use client";

import { useCreateProject } from "@/features/projects/hooks/useCreateProject";
import { FaCloudUploadAlt, FaTimes, FaStar, FaFilm } from "react-icons/fa";
import Image from "next/image";

export default function CreateProjectForm() {
    const {
        files, handleAddFiles, handleRemoveFile,
        mainFileIndex, setMainFileIndex,
        isSubmitting, status, availableTechs,
        selectedTechs, toggleTech, handleSubmit
    } = useCreateProject();

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="text-slate-300 text-sm font-bold block mb-1">Título del Proyecto *</label>
                    <input name="title" required className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Corta *</label>
                    <input name="shortDescription" required maxLength={500} className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Completa *</label>
                    <textarea name="fullDescription" required rows={4} className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" />
                </div>
                <div>
                    <label className="text-slate-300 text-sm font-bold block mb-1">GitHub URL</label>
                    <input name="githubUrl" type="url" placeholder="https://github.com/..." className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                    <label className="text-slate-300 text-sm font-bold block mb-1">Live URL (Demo)</label>
                    <input name="liveUrl" type="url" placeholder="https://..." className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary outline-none transition-all" />
                </div>
            </div>

            <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
                <label className="text-slate-300 text-sm font-bold flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="featured" value="true" className="w-5 h-5 rounded text-primary focus:ring-primary bg-slate-900 border-slate-600" />
                    ¿Mostrar este proyecto como DESTACADO en el inicio?
                </label>
            </div>

            <div>
                <label className="text-slate-300 text-sm font-bold block mb-3">Tecnologías Utilizadas *</label>
                <div className="flex flex-wrap gap-2">
                    {availableTechs.length === 0 && <p className="text-sm text-slate-500 italic flex items-center">Cargando catálogo...</p>}
                    {availableTechs.map((tech) => (
                        <button
                            type="button" key={tech.uuid} onClick={() => toggleTech(tech.uuid)}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${selectedTechs.includes(tech.uuid)
                                ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                }`}
                        >
                            {tech.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <label className="text-slate-300 text-sm font-bold block">Archivos Multimedia (Imágenes o Videos) *</label>
                
                <div className="relative group w-full flex justify-center items-center p-8 border-2 border-dashed border-slate-600 hover:border-primary rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer">
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*,video/*" 
                        onChange={(e) => handleAddFiles(e.target.files)} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="text-center flex flex-col items-center pointer-events-none">
                        <FaCloudUploadAlt className="text-5xl text-slate-500 group-hover:text-primary mb-3 transition-colors" />
                        <p className="text-slate-300 font-medium">Haz clic o arrastra tus archivos aquí</p>
                        <p className="text-slate-500 text-xs mt-1">Soporta JPG, PNG, GIF, MP4, WEBM</p>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {files.map((file, index) => {
                            const isVideo = file.type.startsWith('video/');
                            const objectUrl = URL.createObjectURL(file);

                            return (
                                <div key={index} className={`relative group aspect-video rounded-xl overflow-hidden border-2 transition-all ${mainFileIndex === index ? 'border-primary shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}>
                                    
                                    {isVideo ? (
                                        <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                                            <video src={objectUrl} className="w-full h-full object-cover opacity-80" />
                                            <FaFilm className="absolute text-3xl text-white/70" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full relative">
                                            <Image src={objectUrl} alt="Preview" fill className="object-cover" unoptimized />
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                        
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveFile(index)} 
                                            className="self-end p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                                            title="Eliminar archivo"
                                        >
                                            <FaTimes size={12} />
                                        </button>

                                        <button 
                                            type="button" 
                                            onClick={() => setMainFileIndex(index)} 
                                            className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-xs font-bold transition-colors ${mainFileIndex === index ? 'bg-primary text-slate-900' : 'bg-slate-700/80 text-white hover:bg-slate-600'}`}
                                        >
                                            <FaStar size={10} className={mainFileIndex === index ? 'text-slate-900' : 'text-primary'} />
                                            {mainFileIndex === index ? 'Portada Actual' : 'Hacer Portada'}
                                        </button>
                                    </div>
                                    
                                    {mainFileIndex === index && (
                                        <div className="absolute top-2 left-2 bg-primary text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-lg group-hover:hidden">
                                            PORTADA
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="border-t border-slate-700 pt-6 mt-4">
                <button
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-700 text-slate-950 disabled:text-slate-400 text-lg font-extrabold py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] disabled:shadow-none cursor-pointer"
                >
                    {isSubmitting ? "Procesando y Subiendo archivos..." : "Crear Proyecto"}
                </button>
                {status && (
                    <div className={`text-center mt-4 font-bold text-sm px-4 py-3 rounded-lg ${status.includes('éxito') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {status}
                    </div>
                )}
            </div>
        </form>
    );
}
