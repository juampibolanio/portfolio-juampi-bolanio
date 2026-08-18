import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6" id="inicio">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6">

                    <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight text-white">
                        Juan Pablo <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                            Bolanio
                        </span>
                    </h1>

                    <div>
                        <span className="text-2xl text-neutral-50">
                            Desarrollador Backend
                        </span>
                    </div>

                    <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
                        Con experiencia en Java, Spring Framework y bases de datos relacionales.
                    </p>

                    <div className="flex gap-4 mt-4">
                        <Link href="/proyectos" className="bg-primary text-background px-8 py-4 font-bold rounded-lg hover:scale-95 transition-all shadow-[0_0_20px_rgba(173,198,255,0.3)]">
                            Ver proyectos
                        </Link>
                        <a href="/JuanPabloBolanio_CV.pdf" download className="bg-primary text-background px-8 py-4 font-bold rounded-lg hover:scale-95 transition-all shadow-[0_0_20px_rgba(173,198,255,0.3)]">
                            Descargar CV
                        </a>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end">
                    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 w-full h-full bg-surface rounded-3xl border border-border-subtle flex items-center justify-center shadow-2xl">
                            <span className="text-primary text-9xl font-black font-headline opacity-40">JB</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
