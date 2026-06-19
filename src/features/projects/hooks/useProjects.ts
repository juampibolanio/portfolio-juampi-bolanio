import { useQuery } from "@tanstack/react-query"
import { projectService } from "../services/projects.service"

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => projectService.getAll(),
        staleTime: 1000 * 10,
    });
};

export const useProject = (slug: string) => {
    return useQuery({
        queryKey: ['project'],
        queryFn: () => projectService.getBySlug(slug),
        staleTime: 1000 * 10,
        enabled: !!slug,
    });
};
