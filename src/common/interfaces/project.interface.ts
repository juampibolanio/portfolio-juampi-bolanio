import { Media } from "./media.interface";
import { Technology } from "./technology.interface";

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
