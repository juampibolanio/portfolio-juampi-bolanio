import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Project } from "@/features/projects/interfaces/project.interface";

interface ProjectGridCardProps {
  project: Project;
}

export default function ProjectGridCard({ project }: ProjectGridCardProps) {
  const mainMedia = project.mediaFiles?.find((m) => m.main) || project.mediaFiles?.[0];

  return (
    <article className="group bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col rounded-2xl shadow-lg hover:shadow-2xl">
      <div className="aspect-video overflow-hidden relative bg-slate-950">
        {mainMedia ? (
          mainMedia.mediaType.startsWith("video") ? (
            <video
              src={mainMedia.url}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          ) : (
            <Image
              src={mainMedia.url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          )
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
            <span className="text-slate-600 font-medium">Sin imagen</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech.uuid}
              className="text-[10px] font-bold uppercase tracking-widest bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-primary"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <h3 className="font-headline text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-light">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800/50">
          <Link
            href={`/proyectos/${project.slug}`}
            className="text-primary font-bold text-sm flex items-center gap-2 group/link hover:text-primary/80 transition-colors"
          >
            Ver Detalles 
            <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
          </Link>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
              title="Ver código fuente"
            >
              <FaGithub size={20} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
