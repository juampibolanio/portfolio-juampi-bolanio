import { useState, useEffect } from "react";
import { Technology } from "@/features/technologies/interfaces/technology.interface";
import { projectService } from "@/features/projects/services/projects.service";
import { technologyService } from "@/features/technologies/services/technologies.service";
import { uploadToCloudinary } from "../services/cloudinary.service";

export const useCreateProject = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [mainFileIndex, setMainFileIndex] = useState<number>(0);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState("");
    const [availableTechs, setAvailableTechs] = useState<Technology[]>([]);
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

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
            prev.includes(uuid) ? prev.filter(id => id !== uuid) : [...prev, uuid]
        );
    };

    const handleAddFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const newFilesArray = Array.from(newFiles);
        setFiles(prev => [...prev, ...newFilesArray]);
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(prev => prev.filter((_, i) => i !== indexToRemove));
        if (mainFileIndex === indexToRemove) setMainFileIndex(0);
        else if (mainFileIndex > indexToRemove) setMainFileIndex(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedTechs.length === 0) {
            setStatus("Selecciona al menos una tecnología.");
            return;
        }

        if (files.length === 0) {
            setStatus("Selecciona al menos un archivo multimedia.");
            return;
        }

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);

        setIsSubmitting(true);
        setStatus(`Subiendo ${files.length} archivo(s) a Cloudinary...`);

        try {
            const uploadPromises = files.map(f => uploadToCloudinary(f));
            const cloudinaryResponses = await Promise.all(uploadPromises);

            setStatus("Guardando proyecto en Spring Boot...");

            const mediafilesPayload = cloudinaryResponses.map((res, index) => ({
                url: res.secure_url,
                mediaType: res.resource_type === "video" ? "video/mp4" : (res.format === "pdf" ? "application/pdf" : "image/jpeg"),
                cloudinaryPublicId: res.public_id,
                main: index === mainFileIndex
            }));

            const newProject = {
                title: formData.get("title") as string,
                shortDescription: formData.get("shortDescription") as string,
                fullDescription: formData.get("fullDescription") as string,
                githubUrl: formData.get("githubUrl") as string,
                liveUrl: formData.get("liveUrl") as string,
                featured: formData.get("featured") === "true",
                technologies: selectedTechs,
                mediafiles: mediafilesPayload
            };

            await projectService.create(newProject);

            setStatus("¡Proyecto creado con éxito! ");
            formElement.reset();
            setFiles([]);
            setMainFileIndex(0);
            setSelectedTechs([]);

        } catch (error) {
            console.error(error);
            setStatus("Hubo un error al crear el proyecto.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        files, handleAddFiles, handleRemoveFile,
        mainFileIndex, setMainFileIndex,
        isSubmitting, status, availableTechs,
        selectedTechs, toggleTech, handleSubmit
    };
};
