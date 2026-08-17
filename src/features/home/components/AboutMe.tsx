export default function AboutMe() {
    return (
        <section className="w-full py-24 px-6 relative bg-surface" id="sobre-mi">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="md:col-span-1">
                    <span className="text-primary text-sm uppercase tracking-widest font-bold block mb-2">
                        Descubre más
                    </span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
                        Sobre mi
                    </h2>
                </div>

                <div className="md:col-span-2 flex flex-col gap-6 text-lg text-neutral-400 leading-relaxed font-light">
                    <p>
                        Soy desarrollador desde el año 2024, especializado en el desarrollo backend para todo tipo de aplicaciones y sistemas. He trabajado en proyectos de gran impacto, desde portales web para medios de comunicación hasta sistemas de gestión empresarial. 
                        Si bien me especializo en backend, he adquirido experiencia en el desarrollo fullstack, teniendo el trabajo de analizar, implementar y mantener tanto la lógica del servidor como la interfaz de usuario. Esto me permite tener una visión integral de los proyectos en los que participo, asegurando que cada componente funcione de manera eficiente y coherente respecto a los objetivos del negocio y las necesidades de los usuarios.
                    </p>

                    <p>
                        Me centro en el desarrollo backend con Java y Spring Framework, utilizando bases de datos relacionales como PostgreSQL y MySQL, siempre aplicando buenas prácticas de desarrollo y patrones de diseño para garantizar la escalabilidad y mantenibilidad del código. Busco crear sistemas seguros, en un entorno donde la seguridad de los datos es una prioridad. Además, tengo experiencia en la integración de servicios externos y APIs, lo que me permite ampliar las funcionalidades de las aplicaciones y mejorar la experiencia del usuario.
                        Siempre busco seguir aprendiendo y mejorando mis habilidades, explorando nuevas tecnologías y metodologías de desarrollo para mantenerme actualizado en un campo que evoluciona rápidamente. Mi objetivo es contribuir al éxito de los proyectos en los que participo, aportando soluciones innovadoras y eficientes que generen valor para los usuarios y el negocio.
                    </p>

                </div>

            </div>
        </section>
    )
}