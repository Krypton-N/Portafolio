import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const AboutTimeline = () => {
    return (
        <section id="sobre-mi" className="py-20 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Mi Trayectoria" subtitle="Timeline" />

                <div className="max-w-3xl mx-auto border-l-2 border-zinc-700 ml-4 md:ml-auto">
                    {/* IA ESCOM */}
                    <div className="mb-8 ml-8 relative group">
                        <span className="absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 border-rose-500 bg-zinc-900 group-hover:bg-rose-500 transition-colors duration-300" />
                        <h3 className="text-xl font-bold text-white">Ingeniería en Inteligencia Artificial</h3>
                        <span className="text-m text-rose-400 font-mono">Presente</span>
                        <span className="text-m text-rose-400 font-mono block">Escuela Superior de Computo  (ESCOM) IPN</span>
                        <p className="mt-2 text-zinc-400">
                            Desarrollando soluciones de visión por computadora y automatización de procesos complejos.
                        </p>
                    </div>



                    {/* DEEP LEARNING NVIDIA */}
                    <div className="mb-8 ml-8 relative group">
                        <span className="absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 border-zinc-600 bg-zinc-900 group-hover:border-rose-500 transition-colors duration-300" />
                        <h3 className="text-xl font-bold text-white">Certificación - Fundamentals of Deep Learning NVIDIA</h3>
                        <span className="text-sm text-zinc-400 font-mono">Noviembre 2025 - Enero 2026</span>
                        <span className="text-m text-rose-400 font-mono block">Deep Learning Institute NVIDIA</span>
                        <p className="mt-2 text-zinc-400">
                            Implementación de redes neuronales para tareas de visión
                            por computadora, procesamiento de lenguaje natural
                            y funciones de activación (ReLU, Sigmoid, Linear)

                            Optimización y Rendimiento: Control de Overfitting mediante el uso
                            de Dropout y robustecimiento de modelos a través de Data Augmentation
                            (ajustes de tinte y orientación) para mejorar la generalización con datos nuevos.

                        </p>
                    </div>



                    {/* PM SANTANDER */}
                    <div className="mb-8 ml-8 relative group">
                        <span className="absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 border-zinc-600 bg-zinc-900 group-hover:border-rose-500 transition-colors duration-300" />
                        <h3 className="text-xl font-bold text-white">Certificación - Project Management & Agile Methodologies</h3>
                        <span className="text-sm text-zinc-400 font-mono">Junio 2025 - Agosto 2025</span>
                        <span className="text-m text-rose-400 font-mono block">SANTANDER Academy</span>
                        <p className="mt-2 text-zinc-400">
                            Formación en gestión ágil de proyectos integrando Scrum, Lean Startup y Design Thinking.
                            Creación de MVP, Business Model Canvas, Poker Planning y Gestión de Riesgos.
                        </p>
                    </div>


                    {/* TEC PROGRA BATIZ */}
                    <div className="mb-8 ml-8 relative group">
                        <span className="absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 border-zinc-600 bg-zinc-900 group-hover:border-rose-500 transition-colors duration-300" />
                        <h3 className="text-xl font-bold text-white">Técnico en Programación</h3>
                        <span className="text-sm text-zinc-400 font-mono">2020 - 2024</span>
                        <span className="text-m text-rose-400 font-mono block">Centro de Estudios Cientificos y Tecnologicos No 9 "Juan de Dios Batíz"  (CECyT9) IPN</span>
                        <p className="mt-2 text-zinc-400">
                            Formación intensiva en estructuras de datos, algoritmos y desarrollo de software robusto.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTimeline;
