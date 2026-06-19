import { Media } from "../../../common/interfaces/media.interface";
import { Technology } from "../../technologies/interfaces/technology.interface";

export interface Project {
    uuid: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string
    githubUrl: string;
    liveUrl: string;
    createdAt: string;
    featured: boolean;
    mediaFiles: Media[];
    technologies: Technology[];
}

export interface ProjectCreatePayload {
  title: string;
  shortDescription: string;
  fullDescription: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  technologies: string[];
  mediafiles: {
    url: string;
    mediaType: string;
    cloudinaryPublicId: string;
    main: boolean;
  }[];
}