'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export interface TechItem {
    name: string;
    icon: React.ReactNode;
}

interface ProjectCardProps {
    slug: string;
    title: string;
    description: string;
    images: string[];
    technologies: TechItem[];
    githubUrl?: string;
    liveUrl?: string;
}

export default function ProjectCard({ slug, title, description, images, technologies, githubUrl, liveUrl }: ProjectCardProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

    return (
        <div className="flex flex-col md:flex-row bg-surface rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-15px_rgba(34,211,238,0.3)] group">
            
            <div className="w-full md:w-2/5 relative bg-neutral-900 border-b md:border-b-0 md:border-r border-white/5 h-62.5 md:h-auto">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {images.map((imgSrc, index) => (
                            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
                                <Image 
                                    src={imgSrc} 
                                    alt={`${title} - Vista ${index + 1}`}
                                    fill 
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md">
                    <FaChevronLeft size={16} />
                </button>
                <button onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md">
                    <FaChevronRight size={16} />
                </button>
            </div>

            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-headline font-bold text-white leading-tight">
                        {title}
                    </h3>
                    <div className="flex gap-2 shrink-0">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 rounded-lg transition-all">
                                <FaGithub size={18} />
                            </a>
                        )}
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noreferrer" className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-background border border-primary/20 rounded-lg transition-all">
                                <FaExternalLinkAlt size={16} />
                            </a>
                        )}
                    </div>
                </div>
                
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.map((tech, index) => (
                        <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-neutral-300 tracking-wide">
                            {tech.icon}
                            {tech.name}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <Link href={`/proyectos/${slug}`} className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-primary text-white hover:text-background border border-white/10 hover:border-transparent rounded-lg text-sm font-semibold transition-all duration-300 w-fit">
                        Ver detalles <FaArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}