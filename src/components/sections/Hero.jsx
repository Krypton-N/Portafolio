import React from 'react';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="inicio" className="min-h-screen flex items-center justify-center pt-24 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-rose-600/20 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[128px] animate-pulse delay-1000"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                    <span className="text-sm font-medium text-rose-300">Available for new projects</span>
                </div> */}
                <div className="inline-block px-10 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 ml-6">
                    <span className="text-xl font-medium text-rose-300 ">Ing. Alan Noe Rodriguez Flor</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-white">
                    Construyendo nuevas <br />
                    <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">Neuronas</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Programación sólida e Inteligencia Artificial aplicada. Transformando datos complejos en soluciones funcionales
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <Button href="#proyectos">
                        Ver trabajos <ArrowRight size={20} />
                    </Button>
                    <Button variant="secondary" href="/contact">
                        Contactame
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
