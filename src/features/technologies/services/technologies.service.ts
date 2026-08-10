import { fetchApi } from "@/common/api/api";
import { Technology, CreateTechnologyInput } from "../interfaces/technology.interface";

export const technologyService = {
  getAll: async () => {
    return fetchApi<Technology[]>('/technologies');
  },
  
  create: async (data: CreateTechnologyInput) => {
    return fetchApi<Technology>('/technologies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete: async (uuid: string) => {
    return fetchApi(`/technologies/${uuid}`, {
      method: 'DELETE',
    });
  }
};
