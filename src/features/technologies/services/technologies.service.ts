import { fetchApi } from "@/common/api/api";
import { Technology } from "@/features/technologies/interfaces/technology.interface";

export const technologyService = {
  getAll: async () => {
    return fetchApi<Technology[]>('/technologies');
  }
};