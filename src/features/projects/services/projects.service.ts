import { Project } from "@/common/interfaces/project.interface"
import { fetchApi } from "../../../common/api/api"

export const projectService = {
    getAll: async () => {
        return fetchApi<Project[]>('/projects', {
            next: { revalidate: 3600}
        });
    },
    getBySlug: async (slug: string) => {
        return fetchApi<Project>(`/projects/${slug}`);
    },
};
