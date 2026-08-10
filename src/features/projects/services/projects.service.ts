import { Project, ProjectCreatePayload } from "@/features/projects/interfaces/project.interface"
import { fetchApi } from "../../../common/api/api"

export const projectService = {
    getAll: async () => {
        return fetchApi<Project[]>('/projects', {
            next: { revalidate: 3600 }
        });
    },
    getBySlug: async (slug: string) => {
        return fetchApi<Project>(`/projects/slug/${slug}`);
    },
    create: async (data: ProjectCreatePayload) => {
        return fetchApi<Project>('/projects', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    delete: async (uuid: string) => {
        return fetchApi(`/projects/${uuid}`, {
            method: 'DELETE',
        });
    },
    getById: async (uuid: string) => {
        return fetchApi<Project>(`/projects/${uuid}`);
    },

    update: async (uuid: string, data: ProjectCreatePayload) => {
        return fetchApi<Project>(`/projects/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
};
