"use client";

import { Technology } from "@/features/technologies/interfaces/technology.interface";
import { projectService } from "@/features/projects/services/projects.service";
import { technologyService } from "@/features/technologies/services/technologies.service";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  
  const [availableTechs, setAvailableTechs] = useState<Technology[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]); 
  const [isMainImage, setIsMainImage] = useState(true); 

  useEffect(() => {
    const loadTechs = async () => {
      try {
        const techs = await technologyService.getAll();
        setAvailableTechs(techs);
      } catch (error) {
        console.error("Error cargando tecnologías", error);
      }
    };
    loadTechs();
  }, []);

  const toggleTech = (uuid: string) => {
    setSelectedTechs((prev) => 
      prev.includes(uuid) 
        ? prev.filter(id => id !== uuid) 
        : [...prev, uuid]               
    );
  };

  const uploadToCloudinary = async () => {
    if (!file) return null;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      
      const data = await res.json();
      return data; 
    } catch (error) {
      console.error("Error subiendo a Cloudinary:", error);
      throw new Error("No se pudo subir la imagen");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedTechs.length === 0) {
      setStatus("⚠️ Selecciona al menos una tecnología.");
      return;
    }

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    setIsSubmitting(true);
    setStatus("Subiendo imagen a Cloudinary...");

    try {
      const cloudinaryResponse = await uploadToCloudinary();
      if (!cloudinaryResponse) {
        setStatus("Por favor, selecciona una imagen.");
        setIsSubmitting(false);
        return;
      }

      setStatus("Guardando proyecto en Spring Boot...");

      const newProject = {
        title: formData.get("title") as string,
        shortDescription: formData.get("shortDescription") as string,
        fullDescription: formData.get("fullDescription") as string,
        githubUrl: formData.get("githubUrl") as string,
        liveUrl: formData.get("liveUrl") as string,
        featured: formData.get("featured") === "true",
        technologies: selectedTechs, 
        mediafiles: [
          {
            url: cloudinaryResponse.secure_url,
            mediaType: cloudinaryResponse.format === "pdf" ? "application/pdf" : "image/jpeg",
            cloudinaryPublicId: cloudinaryResponse.public_id,
            main: isMainImage 
          }
        ]
      };

      await projectService.create(newProject);
      

      setStatus("¡Proyecto creado con éxito!");
      formElement.reset();
      setFile(null);
      setSelectedTechs([]);
      setIsMainImage(true);

    } catch (error) {
      console.error(error);
      setStatus("Hubo un error al crear el proyecto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-4">
        Cargar Nuevo Proyecto
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Título del Proyecto *</label>
          <input name="title" required className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none transition-colors" />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Corta *</label>
          <input name="shortDescription" required maxLength={500} className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none transition-colors" />
        </div>
        
        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Completa *</label>
          <textarea name="fullDescription" required rows={5} className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none transition-colors" />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <label className="text-slate-300 text-sm font-bold block mb-1">GitHub URL</label>
            <input name="githubUrl" type="url" placeholder="https://github.com/..." className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div className="flex-1">
            <label className="text-slate-300 text-sm font-bold block mb-1">Live URL (Demo)</label>
            <input name="liveUrl" type="url" placeholder="https://..." className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none transition-colors" />
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
          <label className="text-slate-300 text-sm font-bold flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" value="true" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-slate-800" />
            ¿Mostrar este proyecto como DESTACADO en el inicio?
          </label>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <label className="text-slate-300 text-sm font-bold block mb-3">
            Tecnologías Utilizadas * <span className="text-slate-500 font-normal">(Selecciona al menos una)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTechs.length === 0 && (
              <p className="text-sm text-slate-500 italic">Cargando tecnologías desde el servidor...</p>
            )}
            {availableTechs.map((tech) => {
              const isSelected = selectedTechs.includes(tech.uuid);
              return (
                <button
                  type="button"
                  key={tech.uuid}
                  onClick={() => toggleTech(tech.uuid)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isSelected 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400 hover:text-white'
                  }`}
                >
                  {tech.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <label className="text-slate-300 text-sm font-bold block mb-2">Imagen del Proyecto *</label>
          <input 
            type="file" 
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full mb-4 p-2 text-slate-300 bg-slate-800 rounded border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer" 
          />
          
          <label className="flex items-center gap-3 text-slate-300 text-sm font-bold cursor-pointer w-max">
            <input 
              type="checkbox" 
              checked={isMainImage}
              onChange={(e) => setIsMainImage(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-slate-800" 
            />
            Esta es la imagen principal (Portada)
          </label>
        </div>

        <div className="border-t border-slate-700 pt-6 mt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-lg transition-colors shadow-lg"
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
    </div>
  );
}
