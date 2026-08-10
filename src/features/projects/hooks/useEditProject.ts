import { useState, useEffect } from "react";
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
    const loadInitialData = async () => {
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

        if (project.technologies) {
          setSelectedTechs(project.technologies.map(t => t.uuid));
        }

        if (project.mediaFiles) {
          setExistingMedia(project.mediaFiles);
          const currentMainIndex = project.mediaFiles.findIndex(m => m.main);
          setMainMediaIndex(currentMainIndex !== -1 ? currentMainIndex : 0);
        }
      } catch (error) {
        toast.error("Error fetching project data");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [uuid]);

  const toggleTech = (techUuid: string) => {
    setSelectedTechs(prev =>
      prev.includes(techUuid)
        ? prev.filter(id => id !== techUuid)
        : [...prev, techUuid]
    );
  };

  const handleAddFiles = (filesList: FileList | null) => {
    if (!filesList) return;
    const filesArray = Array.from(filesList);
    setNewFiles(prev => [...prev, ...filesArray]);
  };

  const handleRemoveExistingMedia = (index: number) => {
    setExistingMedia(prev => prev.filter((_, i) => i !== index));
    adjustMainIndexAfterRemoval(index);
  };

  const handleRemoveNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    adjustMainIndexAfterRemoval(existingMedia.length + index);
  };

  const adjustMainIndexAfterRemoval = (removedIndex: number) => {
    if (mainMediaIndex === removedIndex) {
      setMainMediaIndex(0);
    } else if (mainMediaIndex > removedIndex) {
      setMainMediaIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTechs.length === 0) {
      toast.error("Technology selection is required");
      return;
    }

    if (existingMedia.length === 0 && newFiles.length === 0) {
      toast.error("At least one media file is required");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Processing update...", { id: "updateProject" });

    try {
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

      toast.success("Project updated successfully", { id: "updateProject" });
      router.push("/admin/proyectos");
    } catch (error) {
      toast.error("Failed to update project", { id: "updateProject" });
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
