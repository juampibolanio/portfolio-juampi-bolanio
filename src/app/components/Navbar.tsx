/* eslint-disable @next/next/no-img-element */
export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 px-6 py-4 backdrop-blur-md">
            <div className="flex justify-between items-center gap-8 max-w-7xl mx-auto w-full">

                <a className="text-xl font-bold font-headline tracking-tight text-white" href="#main">
                    JPBolanio.dev
                </a>

                <div className="flex gap-8 font-light">
                    <a className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300" href="#sobre-mi">Sobre Mí</a>
                    <a className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300" href="#stack">Stack</a>
                    <a className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300" href="#experiencia">Experiencia</a>
                    <a className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300" href="#proyectos">Proyectos</a>
                    <a className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300" href="#contacto">Contacto</a>
                </div>

                <div className="flex items-center gap-5">
                    
                    <div className="relative group">
                        
                        <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors py-2">

                            <img src="https://flagcdn.com/ar.svg" alt="Español" className="w-5 h-auto rounded-sm object-cover" />
                            <span className="text-sm font-medium">ES</span>
                            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className="absolute right-0 mt-1 w-36 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                            <div className="flex flex-col py-1">
                                <button className="flex items-center gap-3 px-4 py-2 text-sm text-white bg-neutral-800/50 w-full text-left transition-colors">
                                    <img src="https://flagcdn.com/ar.svg" alt="Español" className="w-5 h-auto rounded-sm object-cover" />
                                    Español
                                </button>
                                
                                <button className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white w-full text-left transition-colors">
                                    <img src="https://flagcdn.com/us.svg" alt="English" className="w-5 h-auto rounded-sm object-cover" />
                                    English
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </nav>
    )
}