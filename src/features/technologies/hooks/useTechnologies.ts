import { useQuery } from "@tanstack/react-query"
import { technologyService } from "../services/technologies.service"

export const useTechnologies = () => {
    return useQuery({
        queryKey: ['technologies'],
        queryFn: () => technologyService.getAll(),
        staleTime: 1000 * 10,
    });
};
