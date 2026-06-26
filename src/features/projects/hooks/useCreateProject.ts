import { useState, useEffect } from "react";
import { Technology } from "@/features/technologies/interfaces/technology.interface";
import { projectService } from "@/features/projects/services/projects.service";
import { technologyService } from "@/features/technologies/services/technologies.service";
import { uploadToCloudinary } from "../services/cloudinary.service";

export const useCreateProject = () => {
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
            prev.includes(uuid) ? prev.filter(id => id !== uuid) : [...prev, uuid]
        );
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
            if (!file) throw new Error("Archivo no seleccionado");

            const cloudinaryResponse = await uploadToCloudinary(file);
            if (!cloudinaryResponse) {
                setStatus("Por favor, selecciona una imagen.");
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
                mediafiles: [{
                    url: cloudinaryResponse.secure_url,
                    mediaType: cloudinaryResponse.format === "pdf" ? "application/pdf" : "image/jpeg",
                    cloudinaryPublicId: cloudinaryResponse.public_id,
                    main: isMainImage
                }]
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

    return {
        file, setFile,
        isSubmitting,
        status,
        availableTechs,
        selectedTechs,
        isMainImage, setIsMainImage,
        toggleTech,
        handleSubmit
    };
};
