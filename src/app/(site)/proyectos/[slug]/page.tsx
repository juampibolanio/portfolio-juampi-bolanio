import { projectService } from "@/features/projects/services/projects.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaArrowLeft, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { IconMap } from "@/features/technologies/utils/icon-map";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  let project;
  try {
    project = await projectService.getBySlug(slug);
  } catch (error) {
    notFound();
  }

  const mainMedia = project.mediaFiles?.find((m) => m.main) || project.mediaFiles?.[0];
  const galleryMedia = project.mediaFiles?.filter((m) => !m.main && m.uuid !== mainMedia?.uuid) || [];

  return (
    <article className="max-w-7xl mx-auto px-6 mb-32 pt-12">
      <nav className="mb-10">
        <Link
          href="/proyectos"
          className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
          Volver a Proyectos
        </Link>
      </nav>

      <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 border-b border-slate-800 pb-16">

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full w-fit shadow-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              {project.featured ? "Proyecto Destacado" : "Completado"}
            </span>
          </div>

          <h1 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-slate-950 px-6 py-3.5 text-center font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                Live Demo
                <FaExternalLinkAlt size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center border border-slate-700 bg-slate-900/50 px-6 py-3.5 rounded-lg hover:bg-slate-800 transition-all text-white gap-2 font-bold"
              >
                <FaGithub size={18} />
                Repositorio
              </a>
            )}
          </div>
        </div>

        {mainMedia && (
          <figure className="lg:col-span-7 w-full rounded-2xl bg-slate-900 shadow-2xl border border-slate-800 overflow-hidden relative group">
            {mainMedia.mediaType.startsWith("video") ? (
              <video
                src={mainMedia.url}
                autoPlay
                loop
                muted
                className="w-full h-auto block opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            ) : (
              <Image
                src={mainMedia.url}
                alt={project.title}
                width={1600}
                height={900}
                className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                priority
              />
            )}
          </figure>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        <aside className="lg:col-span-4 flex flex-col gap-10">
          <section>
            <h2 className="font-headline text-xl font-bold mb-5 flex items-center gap-3 text-white">
              <span className="w-6 h-[2px] bg-primary"></span>
              Stack Tecnológico
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech.uuid}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-primary text-xs font-semibold rounded-lg tracking-wider transition-colors hover:bg-slate-800"
                >
                  {IconMap && IconMap[tech.iconUrl] ? IconMap[tech.iconUrl] : <FaCode size={12} />}
                  {tech.name}
                </span>
              ))}
            </div>
          </section>

          <section className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <h3 className="font-headline text-sm uppercase tracking-widest font-bold text-slate-500 mb-4">Registro</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                <time dateTime={project.createdAt} className="text-sm text-slate-300 font-medium">
                  {new Date(project.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </li>
            </ul>
          </section>
        </aside>

        <section className="lg:col-span-8">
          <h2 className="font-headline text-2xl font-bold mb-6 text-white">Sobre el Proyecto</h2>
          <div className="text-base text-slate-400 leading-relaxed font-light whitespace-pre-line prose prose-invert max-w-none">
            {project.fullDescription}
          </div>
        </section>
      </div>

      {galleryMedia.length > 0 && (
        <section className="mb-32">
          <h2 className="font-headline text-2xl font-bold mb-8 text-white flex items-center gap-3">
            <span className="w-6 h-[2px] bg-primary"></span>
            Galería
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryMedia.map((media) => (
              <figure key={media.uuid} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative shadow-lg group">
                {media.mediaType.startsWith("video") ? (
                  <video
                    src={media.url}
                    controls
                    className="w-full h-auto block"
                  />
                ) : (
                  <Image
                    src={media.url}
                    alt="Detalle del proyecto"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                )}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 pointer-events-none group-hover:bg-transparent"></div>
              </figure>
            ))}
          </div>
        </section>
      )}

      <footer>
        <div className="bg-slate-900 p-10 md:p-16 rounded-3xl border border-slate-800 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 relative z-10">
            ¿Interesado en el código fuente?
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto mb-8 relative z-10">
            Explora la implementación técnica y la documentación detallada directamente en el repositorio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 bg-primary text-slate-950 font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                <FaCode size={18} />
                Explorar Código
              </a>
            ) : (
              <span className="px-8 py-3.5 bg-slate-800/80 text-slate-500 font-bold rounded-lg flex items-center justify-center gap-2 cursor-not-allowed border border-slate-700">
                <FaCode size={18} />
                Repositorio Privado
              </span>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}
