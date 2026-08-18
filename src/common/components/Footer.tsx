import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Link href="/" className="text-2xl font-headline font-bold text-white tracking-wide hover:opacity-80 transition-opacity">
                            JPBolanio<span className="text-primary">.dev</span>
                        </Link>
                        <p className="text-neutral-400 text-sm max-w-xs text-center md:text-left leading-relaxed">
                            Diseñando y desarrollando soluciones de software escalables y experiencias digitales premium.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
                    <p className="text-neutral-500 text-sm">
                        &copy; {currentYear} Juan Pablo Bolanio. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-5">
                        <a
                            href="https://github.com/juampibolanio"
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
                            aria-label="GitHub"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/juampibolanio"
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-[#0A66C2] transition-colors duration-300 transform hover:-translate-y-1"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={20} />
                        </a>
                        <a
                            href="mailto:juampi360786@gmail.com"
                            className="text-neutral-400 hover:text-primary transition-colors duration-300 transform hover:-translate-y-1"
                            aria-label="Enviar Email"
                        >
                            <FaEnvelope size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
