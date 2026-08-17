export default function Experience() {
    return (
        <section className="py-24 px-6 w-full bg-background" id="experiencia">
            <div className="max-w-7xl mx-auto w-full">
                
                <div className="flex flex-col gap-2 mb-20">
                    <span className="text-primary text-sm uppercase tracking-widest font-bold">
                        Trayectoria
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
                        Experiencia & <span className="text-primary">Estudios</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    <div>
                        <h3 className="text-2xl font-headline font-bold text-white mb-10 flex items-center gap-3">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Experiencia Laboral
                        </h3>

                        <div className="space-y-12 border-l border-white/10 ml-3 pl-8 relative">
                            
                            <div className="group relative">
                                <div className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-primary transition-all duration-500 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                                
                                <p className="text-sm text-primary mb-1 font-semibold tracking-wide">2025 — PRESENTE</p>
                                <h4 className="font-headline text-xl font-bold text-white transition-colors duration-300">Desarrollador Backend & Co-Founder</h4>
                                <p className="text-neutral-400 text-sm mb-4">Chacú.IO • Remoto</p>
                                <p className="text-base text-neutral-300 max-w-md leading-relaxed transition-all duration-300 group-hover:text-neutral-100">
                                    Me dedico al desarrollo backend dentro de mi emprendimiento Chacú.IO, donde lidero la creación de soluciones tecnológicas innovadoras para clientes de diversos sectores. Mi enfoque principal es garantizar que nuestras aplicaciones sean escalables, seguras y eficientes, utilizando las mejores prácticas de desarrollo y tecnologías modernas.
                                </p>
                            </div>

                            <div className="group relative">
                                <div className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-white/20 transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                                
                                <p className="text-sm text-neutral-500 mb-1 font-semibold tracking-wide transition-colors duration-300 group-hover:text-primary">2024 — 2025</p>
                                <h4 className="font-headline text-xl font-bold text-white transition-colors duration-300">Desarrollador Full Stack</h4>
                                <p className="text-neutral-400 text-sm mb-4">Freelance • Remoto, Resistencia Chaco </p>
                                <p className="text-base text-neutral-300 max-w-md leading-relaxed transition-all duration-300 group-hover:text-neutral-100">
                                    Desarrollé aplicaciones web a medida de acuerdo a las necesidades de mis clientes, abarcando tanto el frontend como el backend. Implementé soluciones eficientes y escalables, asegurando una experiencia de usuario fluida y satisfactoria.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-headline font-bold text-white mb-10 flex items-center gap-3">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            Educación
                        </h3>

                        <div className="space-y-12 border-l border-white/10 ml-3 pl-8 relative">
                            
                            <div className="group relative">
                                <div className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-primary transition-all duration-500 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                                
                                <p className="text-sm text-primary mb-1 font-semibold tracking-wide">2024 - 2025</p>
                                <h4 className="font-headline text-xl font-bold text-white transition-colors duration-300">Tecnicatura Universitaria en Programación</h4>
                                <p className="text-neutral-400 text-sm mb-4">Universidad Tecnológica Nacional (UTN)</p>
                                <p className="text-base text-neutral-300 max-w-md leading-relaxed transition-all duration-300 group-hover:text-neutral-100">
                                    Formación en arquitectura de software, análisis de requerimientos, desarrollo y testing de aplicaciones web y móviles con tecnologías modernas.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}