'use client'

import { useProjects } from "@/features/projects/hooks/useProjects";
import ProjectCard from "./ProjectCard";
import { ProjectCardSkeleton } from "@/common/components/ProjectCardSkeleton";

export default function Projects() {
    const { data, isLoading, isError } = useProjects();

    const featuredProjects = data?.filter(project => project.featured === true) || [];

    return (
        <section className="py-24 px-6 w-full bg-background" id="proyectos">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-y-16">
                
                <div className="flex flex-col gap-2 items-center text-center">
                    <span className="text-primary text-sm uppercase tracking-widest font-bold">
                        Portafolio
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
                        Proyectos Destacados
                    </h2>
                </div>

                <div className="flex flex-col gap-12">
                    {isLoading && (
                        <>
                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                        </>
                    )}

                    {isError && (
                        <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-xl">
                            <p className="text-red-400 font-medium">
                                ¡Ups! Tuvimos un problema al cargar los proyectos. Intenta recargar la página.
                            </p>
                        </div>
                    )}

                    {!isLoading && !isError && featuredProjects.map((project) => (
                        <ProjectCard 
                            key={project.uuid} 
                            {...project} 
                        />
                    ))}
                    

                    {!isLoading && !isError && featuredProjects.length === 0 && (
                        <p className="text-center text-slate-400">
                            Aún estoy trabajando en proyectos increíbles. ¡Vuelve pronto!
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}
