export default function AboutMe() {
    return (
        <section className="w-full py-24 px-6 relative bg-surface" id="about">
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
                        I specialize in creating high-performance web applications that bridge the gap between complex backend logic and fluid user experiences. Currently serving as a Senior Developer, I focus on scalable cloud architectures and clean, maintainable codebases.
                    </p>

                    <p>
                        With over 6 years of experience in the industry, I have led teams through high-stakes product launches and infrastructure migrations. My approach is rooted in the belief that software should be as resilient as it is beautiful.
                    </p>
                </div>

            </div>
        </section>
    )
}