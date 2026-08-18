export default function AboutMe() {
    return (
        <section className="w-full py-24 px-6 relative bg-surface" id="sobre-mi">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="md:col-span-1">
                    <span className="text-primary text-sm uppercase tracking-widest font-bold block mb-2">
                        Descubre más
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
                        Sobre mí
                    </h2>
                </div>

                <div className="md:col-span-2 flex flex-col gap-6 text-lg text-neutral-400 leading-relaxed font-light">
                    <p>
                        Soy desarrollador backend con enfoque en el lenguaje Java, Spring Framework y bases de datos relacionales como PostgreSQL. Me dedico al análisis de requerimientos, diseño, implementación y mantenimiento de diversos tipos de aplicaciones web y sistemas en general, tanto de monolitos como de microservicios, con un enfoque en la escalabilidad, seguridad y eficiencia de las soluciones que desarrollo.
                    </p>

                    <p>
                        He tenido experiencia en el desarrollo fullstack, teniendo que, además de modelar y desarrollar la lógica de negocio, también diseñar y desarrollar la interfaz de usuario, así como la integración con servicios externos y APIs.
                    </p>

                </div>

            </div>
        </section>
    )
}