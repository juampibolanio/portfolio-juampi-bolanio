import {
    FaLaptopCode, FaServer, FaDatabase, FaTools, FaAws, FaJava
} from "react-icons/fa";
import {
    SiAstro, SiCss, SiDocker, SiGit, SiGithub, SiHibernate,
    SiHtml5, SiMysql, SiNestjs, SiNetlify, SiNextdotjs,
    SiNodedotjs, SiPostgresql, SiPostman, SiPrisma,
    SiReact, SiSpring, SiSqlite, SiTailwindcss
} from "react-icons/si";
import { TechBadge } from "./TechBadge";

export default function Stack() {
    return (
        <section className="py-24 px-6 w-full bg-surface" id="stack">
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-y-16">

                <div className="flex flex-col gap-2">
                    <span className="text-primary text-sm uppercase tracking-widest font-bold">
                        Tecnologías y herramientas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
                        Mi <span className="text-primary">Arsenal</span> Técnico
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:auto-rows-fr">

                    {/* FRONTEND*/}
                    <div className="md:col-span-2 group flex flex-col justify-center items-center text-center gap-2 rounded-3xl bg-background p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
                        <FaLaptopCode className="text-4xl text-cyan-400 mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                        <h3 className="text-xl font-headline font-bold text-white mb-6">Frontend Architecture</h3>

                        <div className="flex flex-wrap justify-center gap-2">
                            <TechBadge icon={<SiHtml5 className="text-[#E34F26]" />} name="HTML" />
                            <TechBadge icon={<SiCss className="text-[#1572B6]" />} name="CSS" />
                            <TechBadge icon={<SiReact className="text-[#61DAFB]" />} name="React" />
                            <TechBadge icon={<SiNextdotjs className="text-white" />} name="Next.js" />
                            <TechBadge icon={<SiTailwindcss className="text-[#38B2AC]" />} name="Tailwind" />
                            <TechBadge icon={<SiAstro className="text-[#FF5D01]" />} name="Astro" />
                        </div>
                    </div>

                    {/* BACKEND */}
                    <div className="md:col-span-1 group flex flex-col justify-center items-center text-center gap-2 rounded-3xl bg-background p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/30 hover:shadow-[0_0_30px_-10px_rgba(52,211,153,0.2)]">
                        <FaServer className="text-4xl text-emerald-400 mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                        <h3 className="text-xl font-headline font-bold text-white mb-6">Backend</h3>

                        <div className="flex flex-wrap justify-center gap-2">
                            <TechBadge icon={<FaJava className="text-[#ED8B00]" />} name="Java" />
                            <TechBadge icon={<SiSpring className="text-[#6DB33F]" />} name="Spring" />
                            <TechBadge icon={<SiNodedotjs className="text-[#339933]" />} name="Node.js" />
                            <TechBadge icon={<SiNestjs className="text-[#E0234E]" />} name="NestJS" />
                        </div>
                    </div>

                    {/* DATABASE & ORM  */}
                    <div className="md:col-span-1 md:row-span-2 group flex flex-col justify-center items-center text-center gap-2 rounded-3xl bg-background p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/30 hover:shadow-[0_0_30px_-10px_rgba(192,132,252,0.2)]">
                        <FaDatabase className="text-4xl text-purple-400 mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                        <h3 className="text-xl font-headline font-bold text-white mb-6">Database & ORM</h3>

                        <div className="flex flex-col gap-3 w-full items-center">
                            <TechBadge icon={<SiPostgresql className="text-[#4169E1]" />} name="PostgreSQL" />
                            <TechBadge icon={<SiMysql className="text-[#4479A1]" />} name="MySQL" />
                            <TechBadge icon={<SiSqlite className="text-[#0F80CC]" />} name="SQLite" />
                            <TechBadge icon={<SiHibernate className="text-[#BCAE79]" />} name="Hibernate" />
                            <TechBadge icon={<SiPrisma className="text-white" />} name="Prisma" />
                        </div>
                    </div>

                    {/* DEVOPS & TOOLS */}
                    <div className="md:col-span-3 group flex flex-col justify-center items-center text-center gap-2 rounded-3xl bg-background p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-rose-400/30 hover:shadow-[0_0_30px_-10px_rgba(251,113,133,0.2)]">
                        <FaTools className="text-4xl text-rose-400 mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                        <h3 className="text-xl font-headline font-bold text-white mb-6">DevOps & Herramientas</h3>

                        <div className="flex flex-wrap justify-center gap-3">
                            <TechBadge icon={<SiDocker className="text-[#2496ED]" />} name="Docker" />
                            <TechBadge icon={<FaAws className="text-[#FF9900]" />} name="AWS" />
                            <TechBadge icon={<SiGit className="text-[#F05032]" />} name="Git" />
                            <TechBadge icon={<SiGithub className="text-white" />} name="GitHub" />
                            <TechBadge icon={<SiPostman className="text-[#FF6C37]" />} name="Postman" />
                            <TechBadge icon={<SiNetlify className="text-[#00C7B7]" />} name="Netlify" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
