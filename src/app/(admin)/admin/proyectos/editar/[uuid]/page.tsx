"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectService } from "@/features/projects/services/projects.service";
import { technologyService } from "@/features/technologies/services/technologies.service";
import { Technology } from "@/features/technologies/interfaces/technology.interface";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/features/projects/services/cloudinary.service";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const uuid = params.uuid as string;

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const [availableTechs, setAvailableTechs] = useState<Technology[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isMainImage, setIsMainImage] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const techs = await technologyService.getAll();
        setAvailableTechs(techs);

        const project = await projectService.getById(uuid);
        
        setTitle(project.title || "");
        setShortDescription(project.shortDescription || "");
        setFullDescription(project.fullDescription || "");
        setGithubUrl(project.githubUrl || "");
        setLiveUrl(project.liveUrl || "");
        setFeatured(project.featured || false);

        if (project.technologies) {
          setSelectedTechs(project.technologies.map(t => t.uuid));
        }

        const mainMedia = project.mediaFiles?.find(m => m.main) || project.mediaFiles?.[0];
        if (mainMedia) {
          setCurrentImageUrl(mainMedia.url);
          setIsMainImage(mainMedia.main);
        }

      } catch (error) {
        toast.error("Error al cargar la información del proyecto");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (uuid) {
      loadInitialData();
    }
  }, [uuid]);

  const toggleTech = (techUuid: string) => {
    setSelectedTechs(prev =>
      prev.includes(techUuid)
        ? prev.filter(id => id !== techUuid)
        : [...prev, techUuid]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTechs.length === 0) {
      toast.error("Selecciona al menos una tecnología.");
      return;
    }

    setIsSubmitting(true);

    try {
      let mediaList = [];

      if (file) {
        toast.loading("Subiendo nueva imagen a Cloudinary...", { id: "editToast" });
        const cloudinaryResponse = await uploadToCloudinary(file);
        
        mediaList.push({
          url: cloudinaryResponse.secure_url,
          mediaType: cloudinaryResponse.format === "pdf" ? "application/pdf" : "image/jpeg",
          cloudinaryPublicId: cloudinaryResponse.public_id,
          main: isMainImage,
        });
      }

      toast.loading("Guardando cambios en Spring Boot...", { id: "editToast" });

      const updatedProjectData = {
        title,
        shortDescription,
        fullDescription,
        githubUrl,
        liveUrl,
        featured,
        technologies: selectedTechs,
        mediafiles: mediaList,
      };

      await projectService.update(uuid, updatedProjectData);

      toast.success("¡Proyecto actualizado con éxito! 🎉", { id: "editToast" });
      router.push("/admin/proyectos");

    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el proyecto", { id: "editToast" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-400">
        Cargando datos del proyecto...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 mt-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-4">
        Editar Proyecto
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Título *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Corta *</label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
            maxLength={500}
            className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Descripción Completa *</label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            required
            rows={5}
            className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <label className="text-slate-300 text-sm font-bold block mb-1">GitHub URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-slate-300 text-sm font-bold block mb-1">Live URL (Demo)</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
          <label className="text-slate-300 text-sm font-bold flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 bg-slate-800"
            />
            ¿Mostrar este proyecto como DESTACADO en el inicio?
          </label>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <label className="text-slate-300 text-sm font-bold block mb-3">Tecnologías Utilizadas *</label>
          <div className="flex flex-wrap gap-2">
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
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {tech.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <label className="text-slate-300 text-sm font-bold block mb-2">Imagen Actual</label>
          {currentImageUrl && (
            <div className="mb-4">
              <img src={currentImageUrl} alt="Preview" className="h-32 object-cover rounded-lg border border-slate-700" />
            </div>
          )}

          <label className="text-slate-300 text-sm font-bold block mb-1">Cambiar Imagen (Opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 text-slate-300 bg-slate-800 rounded border border-slate-700"
          />
        </div>

        <div className="border-t border-slate-700 pt-6 flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-1/3 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-2/3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-lg font-bold py-3 rounded-lg transition-colors shadow-lg"
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>

      </form>
    </div>
  );
}
