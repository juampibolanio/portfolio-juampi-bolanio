import { Project, ProjectCreatePayload } from "@/features/projects/interfaces/project.interface"
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
    create: async (data: ProjectCreatePayload) => {
    return fetchApi<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};
