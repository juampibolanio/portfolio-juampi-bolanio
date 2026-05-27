import ProjectCard from "./ProjectCard";
import { SiNextdotjs, SiTailwindcss, SiSpring, SiPostgresql, SiReact, SiDocker, SiRedis, SiTypescript } from 'react-icons/si';

export default function Projects() {
    const projects = [
        {
            slug: "ecommerce-fintech",
            title: "Plataforma E-Commerce Fintech",
            description: "Solución integral para pagos en línea. Arquitectura escalable orientada a microservicios, integrada con pasarelas de pago y panel de administración en tiempo real.",
            technologies: [
                { name: "Next.js", icon: <SiNextdotjs size={14} /> },
                { name: "Tailwind", icon: <SiTailwindcss size={14} /> },
                { name: "Spring Boot", icon: <SiSpring size={14} /> },
                { name: "PostgreSQL", icon: <SiPostgresql size={14} /> }
            ],
            images: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
            ],
            githubUrl: "https://github.com/tu-usuario/proyecto-1",
            liveUrl: "https://ejemplo.com"
        },
        {
            slug: "task-manager-saas",
            title: "Gestor de Tareas SaaS",
            description: "Aplicación de productividad con funcionalidades de colaboración en tiempo real, gestión de equipos y analíticas de rendimiento para usuarios corporativos.",
            technologies: [
                { name: "React", icon: <SiReact size={14} /> },
                { name: "TypeScript", icon: <SiTypescript size={14} /> },
                { name: "Redis", icon: <SiRedis size={14} /> },
                { name: "Docker", icon: <SiDocker size={14} /> }
            ],
            images: [
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
            ],
            githubUrl: "https://github.com/tu-usuario/proyecto-2"
        },
        {
            slug: "health-dashboard",
            title: "Dashboard Médico Analytics",
            description: "Sistema de monitoreo de datos de salud en tiempo real, visualización de historiales clínicos y exportación de reportes automáticos para profesionales médicos.",
            technologies: [
                { name: "Next.js", icon: <SiNextdotjs size={14} /> },
                { name: "Spring Boot", icon: <SiSpring size={14} /> },
                { name: "PostgreSQL", icon: <SiPostgresql size={14} /> }
            ],
            images: [
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1584982209796-05658e47bf1b?q=80&w=1200&auto=format&fit=crop"
            ],
            liveUrl: "https://dashboard-ejemplo.com"
        }
    ];

    return (
        <section className="py-24 px-6 w-full bg-background" id="projects">
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
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index}
                            {...project} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}