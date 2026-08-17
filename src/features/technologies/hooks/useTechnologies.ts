import { useState, useEffect } from "react";
import { Technology, CreateTechnologyInput } from "../interfaces/technology.interface";
import { technologyService } from "../services/technologies.service";
import toast from "react-hot-toast";

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTechnologies = async () => {
    try {
      setIsLoading(true);
      const data = await technologyService.getAll();
      setTechnologies(data);
    } catch (error) {
      toast.error("Error al cargar tecnologías");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const handleCreate = async (data: CreateTechnologyInput, onSuccess: () => void) => {
    try {
      setIsSubmitting(true);
      const newTech = await technologyService.create(data);
      setTechnologies((prev) => [...prev, newTech]);
      toast.success("Tecnología creada con éxito");
      onSuccess();
    } catch (error) {
      toast.error("Error al crear tecnología");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (uuid: string, data: CreateTechnologyInput, onSuccess: () => void) => {
    try {
      setIsSubmitting(true);
      const updatedTech = await technologyService.update(uuid, data);
      setTechnologies((prev) => prev.map((t) => (t.uuid === uuid ? updatedTech : t)));
      toast.success("Tecnología actualizada con éxito");
      onSuccess();
    } catch (error) {
      toast.error("Error al actualizar tecnología");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (uuid: string) => {
    const confirmed = window.confirm("¿Seguro que deseas eliminar esta tecnología?");
    if (!confirmed) return;

    try {
      await technologyService.delete(uuid);
      setTechnologies((prev) => prev.filter((t) => t.uuid !== uuid));
      toast.success("Tecnología eliminada");
    } catch (error) {
      toast.error("Error al eliminar tecnología");
    }
  };

  return {
    technologies,
    isLoading,
    isSubmitting,
    handleCreate,
    handleUpdate,
    handleDelete
  };
};
