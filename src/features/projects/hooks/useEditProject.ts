import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { projectService } from "@/features/projects/services/projects.service";
import { technologyService } from "@/features/technologies/services/technologies.service";
import { uploadToCloudinary } from "@/features/projects/services/cloudinary.service";
import { Technology } from "@/features/technologies/interfaces/technology.interface";
import { Media } from "@/common/interfaces/media.interface";

export const useEditProject = (uuid: string) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const [availableTechs, setAvailableTechs] = useState<Technology[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const [existingMedia, setExistingMedia] = useState<Media[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {

    if (!uuid) return;

    try {
      setIsLoading(true);
      const [techs, project] = await Promise.all([
        technologyService.getAll(),
        projectService.getById(uuid)
      ]);

        setAvailableTechs(techs);
        setTitle(project.title || "");
        setShortDescription(project.shortDescription || "");
        setFullDescription(project.fullDescription || "");
        setGithubUrl(project.githubUrl || "");
        setLiveUrl(project.liveUrl || "");
        setFeatured(project.featured || false);
        setSelectedTechs(project.technologies ? project.technologies.map(t => t.uuid) : []);
        setExistingMedia(project.mediaFiles || []);
        setMainMediaIndex(project.mediaFiles && project.mediaFiles.length > 0 ? project.mediaFiles.findIndex(m => m.main) !== -1 ? project.mediaFiles.findIndex(m => m.main) : 0 : 0);
    } catch {
      toast.error("Error al cargar los datos del proyecto");
    } finally {
      setIsLoading(false);
    }
    };

    loadData();
  }, [uuid, setIsLoading, setAvailableTechs, setTitle, setShortDescription, setFullDescription, setGithubUrl, setLiveUrl, setFeatured, setSelectedTechs, setExistingMedia, setMainMediaIndex]);

  const toggleTech = useCallback((techUuid: string) => {
    setSelectedTechs(prev =>
      prev.includes(techUuid)
        ? prev.filter(id => id !== techUuid)
        : [...prev, techUuid]
    );
  }, []);

  const handleAddFiles = useCallback((filesList: FileList | null) => {
    if (!filesList) return;
    setNewFiles(prev => [...prev, ...Array.from(filesList)]);
  }, []);

  const adjustMainIndexAfterRemoval = useCallback((removedIndex: number) => {
    setMainMediaIndex(prev => {
      if (prev === removedIndex) return 0;
      if (prev > removedIndex) return prev - 1;
      return prev;
    });
  }, []);

  const handleRemoveExistingMedia = useCallback((index: number) => {
    setExistingMedia(prev => prev.filter((_, i) => i !== index));
    adjustMainIndexAfterRemoval(index);
  }, [adjustMainIndexAfterRemoval]);

  const handleRemoveNewFile = useCallback((index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    adjustMainIndexAfterRemoval(existingMedia.length + index);
  }, [existingMedia.length, adjustMainIndexAfterRemoval]);

  const processMediaFiles = async () => {
    const uploadPromises = newFiles.map(f => uploadToCloudinary(f));
    const cloudinaryResponses = await Promise.all(uploadPromises);

    const mappedNewMedia = cloudinaryResponses.map(res => ({
      url: res.secure_url,
      mediaType: res.resource_type === "video" ? "video/mp4" : "image/jpeg",
      cloudinaryPublicId: res.public_id,
      main: false
    }));

    const mappedExistingMedia = existingMedia.map(m => ({
      url: m.url,
      mediaType: m.mediaType,
      cloudinaryPublicId: m.cloudinaryPublicId,
      main: false
    }));

    const combinedMedia = [...mappedExistingMedia, ...mappedNewMedia];
    const safeMainIndex = mainMediaIndex < combinedMedia.length ? mainMediaIndex : 0;

    if (combinedMedia.length > 0) {
      combinedMedia[safeMainIndex].main = true;
    }

    return combinedMedia;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTechs.length === 0) {
      toast.error("Se debe seleccionar al menos una tecnología");
      return;
    }

    if (existingMedia.length === 0 && newFiles.length === 0) {
      toast.error("Se requiere al menos un archivo multimedia");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Procesando actualización...", { id: "updateProject" });

    try {
      const combinedMedia = await processMediaFiles();

      const updatedProjectData = {
        title,
        shortDescription,
        fullDescription,
        githubUrl,
        liveUrl,
        featured,
        technologies: selectedTechs,
        mediafiles: combinedMedia,
      };

      await projectService.update(uuid, updatedProjectData);

      toast.success("Proyecto actualizado con éxito", { id: "updateProject" });
      router.push("/admin/proyectos");
    } catch {
      toast.error("Error al actualizar el proyecto", { id: "updateProject" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title, setTitle,
    shortDescription, setShortDescription,
    fullDescription, setFullDescription,
    githubUrl, setGithubUrl,
    liveUrl, setLiveUrl,
    featured, setFeatured,
    availableTechs, selectedTechs, toggleTech,
    existingMedia, newFiles,
    mainMediaIndex, setMainMediaIndex,
    handleAddFiles, handleRemoveExistingMedia, handleRemoveNewFile,
    isLoading, isSubmitting, handleSubmit,
    router
  };
};
